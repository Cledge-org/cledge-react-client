import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import AuthFunctions from "./auth/firebase-auth";
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

  if (userId && pathwayId) {
    try {
      const result = {
        ...(await getPathwayAndProgress(userId, pathwayId)),
        uid: userId,
      };
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No user id provided");
  }
};

// Gets both the pathway for a user and a user's progress in it
export function getPathwayAndProgress(
  userId: string,
  pathwayId: ObjectId
): Promise<{
  pathwayInfo: Pathway;
  pathwaysProgress: PathwayProgress[];
}> {
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
      const requestedPathway = pathways.find(
        ({ _id }) => _id.toString() === pathwayId.toString()
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
          name: requestedPathway.name,
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
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
