import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, userId, contentProgress } = JSON.parse(req.body);
  return contentProgress
    ? resolve
        .status(200)
        .send(await putPathwayProgress(userId, contentProgress))
    : resolve
        .status(400)
        .send("No pathway content progress or userId provided");
};

// Sets pathway content progress for a user by their firebase ID (string). Batch
// update between module ID as a string and ContentProgress[]. If a module is in
// the map, the value in the database will be set to its corresponding value in
// the map provided. If a module is not provided, it will not be updated in the
// database
export const putPathwayProgress = async (
  userId: string,
  contentProgress: Record<string, ContentProgress[]> // Map between module ID and a list of ContentProgress for that module
): Promise<boolean> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          let updateResult = await client
            .db("pathways")
            .collection("progress-by-user")
            .updateOne(
              { firebaseId: userId },
              { $set: contentProgress },
              { upsert: true }
            );
          res(updateResult.acknowledged);
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
