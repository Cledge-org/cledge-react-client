import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { getSpecificPathwayProgress } from "./get-pathway-progress";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);
  return !userId
    ? resolve.status(400).send("No userId provided")
    : resolve.status(200).send(await getAllPathwayProgress(userId));
};

// Gets gets progress info for user for every learning pathway
// TODO: optimize, paginate
export async function getAllPathwayProgress(
  userId: string
): Promise<PathwayProgress[]> {
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
      }
    );
  });
}
