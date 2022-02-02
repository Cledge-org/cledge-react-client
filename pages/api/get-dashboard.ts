import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import AuthFunctions from "./auth/firebase-auth";
import { getAccountInfo } from "./get-account";
import { getAllPathwayProgress } from "./get-all-pathway-progress";
import { getSpecificPathway } from "./get-all-pathways";
import { getSpecificPathwayProgress } from "./get-pathway-progress";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userId } = JSON.parse(req.body);
  return userId
    ? resolve.status(200).send(await getAllPathwaysAccountAndProgress(userId))
    : resolve.status(400).send("No user id provided");
};
export async function getAllPathwaysAccountAndProgress(
  userId: string
): Promise<{ dashboardInfo: Dashboard; allPathways: Pathway[] }> {
  console.error(userId);
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const pathwaysDb = client.db("pathways");
        const usersDb = client.db("users");
        const [pathways, userInfo, progressByModule]: [
          Pathway_Db[],
          AccountInfo,
          Record<string, ContentProgress[]>
        ] = await Promise.all([
          pathwaysDb.collection("pathways").find().toArray() as Promise<
            Pathway_Db[]
          >,
          usersDb.collection("users").findOne({
            firebaseId: userId,
          }) as Promise<AccountInfo>,
          pathwaysDb
            .collection("progress-by-user")
            .findOne({ firebaseId: userId }) as Promise<
            Record<string, ContentProgress[]>
          >,
        ]);
        res({
          allPathways: (await Promise.all(
            pathways.map((pathway: Pathway_Db) =>
              getSpecificPathway(pathway, pathwaysDb)
            )
          )) as Pathway[],
          dashboardInfo: {
            userTags: userInfo.tags,
            userProgress: !progressByModule
              ? []
              : ((await Promise.all(
                  pathways.map((pathway: Pathway_Db) =>
                    getSpecificPathwayProgress(
                      userInfo.tags,
                      pathway,
                      pathwaysDb,
                      progressByModule
                    )
                  )
                )) as PathwayProgress[]),
            userName: userInfo.name,
            checkIns: userInfo.checkIns,
          },
        });
      }
    );
  });
}
