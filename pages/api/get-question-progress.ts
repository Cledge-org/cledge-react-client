import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccountInfo } from "./get-account";
import { getQuestionResponses } from "./get-question-responses";
import assert from "assert";
import { getQuestionListWithDatabase } from "./get-question-list";
import AuthFunctions from "./auth/firebase-auth";
import { getAllQuestionLists } from "./get-all-questions";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const questionProgress = await getQuestionProgress();
    resolve.status(200).send(questionProgress);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Gets all user responses to relevant questions by a user's firebaseId
export async function getQuestionProgress(): Promise<{
  questionData: QuestionList[];
}> {
  const questionData = await getAllQuestionLists();
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        res({
          questionData,
        });
      }
    );
  });
}
