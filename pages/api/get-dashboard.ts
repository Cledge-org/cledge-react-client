import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import AuthFunctions from "./auth/firebase-auth";
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

  if (!userId) {
    resolve.status(400).send("No user id provided");
  } else {
    try {
      const pathwaysAndProgress = await getAllPathwaysAccountAndProgress(
        userId
      );
      resolve.status(200).send(pathwaysAndProgress);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};
export function getAllPathwaysAccountAndProgress(
  userId: string
): Promise<{ dashboardInfo: Dashboard; allPathways: Pathway[] }> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
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
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
