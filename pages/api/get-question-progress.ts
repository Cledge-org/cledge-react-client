import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccountInfo } from "./get-account";
import { getQuestionResponses } from "./get-question-responses";
import assert from "assert";
import { getQuestionListWithDatabase } from "./get-question-list";
import { MONGO_CONNECTION_STRING } from "../../config";
import AuthFunctions from "./auth/firebase-auth";
import { getAllQuestionLists } from "./get-all-questions";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);
  return !userId
    ? resolve.status(400).send("No user Id given")
    : resolve.status(200).send(await getQuestionProgress(userId));
};

// Gets all user responses to relevant questions by a user's firebaseId
export async function getQuestionProgress(
  userId: string
): Promise<{ questionData: QuestionList[] }> {
  const questionData = await getAllQuestionLists();
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        res({
          questionData,
        });
      }
    );
  });
}
