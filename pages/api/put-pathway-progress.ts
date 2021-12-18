import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, userId, contentProgress } = req.body;
  return contentProgress
    ? resolve.status(200).send(await putPathwayProgress(userId, contentProgress))
    : resolve.status(400).send("No pathway content progress provided");
};

// Sets pathway content progress for a user. Updates pathway content if already
// present. If an pathway content progress in the database is not provided in the
// map, it will not be updated
export const putPathwayProgress = async (
  userId: string,
  contentProgress: Record<string, ContentProgress> // Map between content ID and content progress
): Promise<string> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          let updateResult = await client
            .db("courses")
            .collection("progress-by-user")
            .updateOne(
              { _id: userId },
              { $set: contentProgress },
              { upsert: true }
            );
          res(updateResult.upsertedId.toString());
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
