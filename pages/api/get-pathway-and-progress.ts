import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";
import AuthFunctions from "./auth/firebase-auth";
import { getAccountInfo } from "./get-account";
import { getAllPathwayProgress } from "./get-all-pathway-progress";
import { getSpecificPathway } from "./get-all-pathways";
import { getSpecificPathwayProgress } from "./get-pathway-progress";
import { getModule } from "./get-pathway";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { pathwayId, userId } = JSON.parse(req.body);
  return userId && pathwayId
    ? resolve.status(200).send({
        ...(await getPathwayAndProgress(userId, pathwayId)),
        uid: userId,
      })
    : resolve.status(400).send("No user id provided");
};
export async function getPathwayAndProgress(
  userId: string,
  pathwayId: string
): Promise<{
  pathwayInfo: Pathway;
  pathwaysProgress: PathwayProgress[];
}> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
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
        const requestedPathway = pathways.find(
          ({ _id }) => _id.toString() === pathwayId
        );
        let modules: PathwayModule[] = await Promise.all(
          requestedPathway.modules.map((moduleId) =>
            getModule(moduleId, pathwaysDb, userInfo.tags)
          )
        );
        modules = modules.filter((x) => x !== null);
        res({
          pathwayInfo: {
            tags: requestedPathway.tags,
            title: requestedPathway.title,
            _id: requestedPathway._id,
            modules,
          },
          pathwaysProgress: !progressByModule
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
        });
      }
    );
  });
}
