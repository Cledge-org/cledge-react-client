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
  const { userToken, userId } = req.body;
  return userId
    ? resolve.status(200).send(await getQuestionResponses(userId))
    : resolve.status(400).send("No user id provided");
};

// Gets a user's question responses
export const getQuestionResponses = async (
  userId: string
): Promise<UserResponse[]> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const user_db = client.db("users");
        const question_response_collection = user_db.collection("question-responses");
        question_response_collection.findOne(
          { _id: userId },
          (document_err, user_responses) => {
            document_err
              ? err(document_err)
              : res(user_responses.responses);
          }
        );
      }
    );
  });
};
