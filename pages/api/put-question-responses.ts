import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../secrets";

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
        try {
          await client
            .db("users")
            .collection("question-responses")
            .updateOne(
              { _id: new ObjectId(userId) },
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
