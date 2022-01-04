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
  const { userToken, userId } = JSON.parse(req.body);
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
        client
          .db("users")
          .collection("question-responses")
          .findOne({ firebaseId: userId }, (document_err, user_responses) => {
            console.error(user_responses);
            document_err
              ? err(document_err)
              : res(user_responses === null ? [] : user_responses.responses);
          });
      }
    );
  });
};
