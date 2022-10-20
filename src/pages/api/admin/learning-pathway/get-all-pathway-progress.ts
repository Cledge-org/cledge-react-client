import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSpecificPathwayProgress } from "../../user/get-pathway-progress";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);

  if (userId) {
    try {
      const pathwayProgress = await getAllPathwayProgress(userId);
      resolve.status(200).send(pathwayProgress);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No userId provided");
  }
};

// Gets gets progress info for user for every learning pathway
// TODO: optimize, paginate
export function getAllPathwayProgress(
  userId: string
): Promise<PathwayProgress[]> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
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
      if (!progressByModule) {
        res([]);
        return;
      }
      res(
        (await Promise.all(
          pathways.map((pathway: Pathway_Db) =>
            getSpecificPathwayProgress(
              userInfo.tags,
              pathway,
              pathwaysDb,
              progressByModule
            )
          )
        )) as PathwayProgress[]
      );
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
