import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { getSpecificPathwayProgress } from "./get-pathway-progress";
import { MONGO_CONNECTION_STRING } from "../../secrets";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId } = req.body;
  return userId
    ? resolve.status(200).send(await getAllPathwayProgress(userId))
    : resolve.status(400).send("userId required");
};

// Gets gets progress info for user for every learning pathway
// TODO: optimize, paginate
export async function getAllPathwayProgress(
  userId: string
): Promise<PathwayProgress[]> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const courseDb = client.db("pathways");
        const usersDb = client.db("users");

        const [pathways, userInfo, progressByModule]: [
          Pathway_Db[],
          AccountInfo,
          Record<string, ContentProgress[]>
        ] = await Promise.all([
          courseDb.collection("pathways").find().toArray() as Promise<
            Pathway_Db[]
          >,
          usersDb
            .collection("users")
            .findOne({ _id: new ObjectId(userId) }) as Promise<AccountInfo>,
          courseDb
            .collection("progress-by-user")
            .findOne({ _id: new ObjectId(userId) }) as Promise<
            Record<string, ContentProgress[]>
          >,
        ]);
        res(
          (await Promise.all(
            pathways.map((pathway: Pathway_Db) =>
              getSpecificPathwayProgress(
                userInfo.tags,
                pathway,
                courseDb,
                progressByModule
              )
            )
          )) as PathwayProgress[]
        );
      }
    );
  });
}
