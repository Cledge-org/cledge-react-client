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
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, responses } = JSON.parse(req.body);
  return userId && responses
    ? resolve.status(200).send(await putQuestionResponses(userId, responses))
    : resolve.status(400).send("No user id or responses provided");
};

// Creates or updates a user's question responses by their firebase Id (string)
export const putQuestionResponses = async (
  userId: string,
  responses: UserResponse[]
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          await client
            .db("users")
            .collection("question-responses")
            .updateOne(
              { firebaseId: userId },
              { $set: { responses } },
              { upsert: true }
            );
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
