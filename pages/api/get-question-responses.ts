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
  const { userId } = JSON.parse(req.body);
  
  if (userId) {
    try {
      const questionResponses = await getQuestionResponses(userId);
      resolve.status(200).send(questionResponses);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No user Id provided");
  }
};

// Gets a user's question responses by a user's firebaseId
export const getQuestionResponses = async (
  userId: string
): Promise<UserResponse[]> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        client
          .db("users")
          .collection("question-responses")
          .findOne({ firebaseId: userId }, (document_err, user_responses) => {
            document_err
              ? err(document_err)
              : res(user_responses === null ? [] : user_responses.responses);
          });
      }
    );
  });
};
