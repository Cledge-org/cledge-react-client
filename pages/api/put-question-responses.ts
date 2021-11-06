import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, responses } = req.body;
  return userId
    ? resolve.status(200).send(await putQuestionResponses(userId, responses))
    : resolve.status(400).send("No user id provided");
};

// Creates or updates a user's question responses
export const putQuestionResponses = async (
  userId: string,
  responses: UserResponse[]
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const user_db = client.db("users");
        const question_response_collection =
          user_db.collection("question-responses");
        try {
          await question_response_collection.updateOne(
            { _id: userId },
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
