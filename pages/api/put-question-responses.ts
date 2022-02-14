import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import AuthFunctions from "./auth/firebase-auth";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, responses, userId } = JSON.parse(req.body);

  if (userId && responses) {
    try {
      const result = await putQuestionResponses(userId, responses);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No user id or responses provided");
  }
};

// Creates or updates a user's question responses by their firebase Id (string)
export const putQuestionResponses = async (
  userId: string,
  responses: UserResponse[]
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
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
