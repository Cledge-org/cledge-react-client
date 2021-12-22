import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccountInfo } from "./get-account";
import { getQuestionResponses } from "./get-question-responses";
import assert from "assert";
import { getQuestionListWithDatabase } from "./get-question-list";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(getQuestionProgress("TEST_USER_ID"));
};

// Gets all user responses to relevant questions
export async function getQuestionProgress(
  userId: string
): Promise<ProgressInfo> {
  const [userResponses, userInfo] = await Promise.all([
    getQuestionResponses(userId),
    getAccountInfo(userId),
  ]);

  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const questionsDb = client.db("questions");
        // TODO: Fetch other lists for user
        const gradeQuestionList: QuestionList =
          await getQuestionListWithDatabase(
            `${userInfo.grade}th Grade`,
            questionsDb
          );
        res({
          userProgress: { responses: userResponses },
          questionData: [gradeQuestionList],
        });
      }
    );
  });
}
