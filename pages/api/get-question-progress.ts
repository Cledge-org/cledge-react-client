import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccountInfo } from "./get-account";
import { getQuestionResponses } from "./get-question-responses";
import assert from "assert";
import { getQuestionListWithDatabase } from "./get-question-list";
import { MONGO_CONNECTION_STRING } from "../../config";
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
    : resolve.status(200).send(await getQuestionProgress("TEST_USER_ID"));
};

// Gets all user responses to relevant questions
export async function getQuestionProgress(
  userId: string
): Promise<ProgressInfo> {
  const [userResponses, questionData] = await Promise.all([
    getQuestionResponses(userId),
    getAllQuestionLists(),
  ]);
  console.error(userResponses);
  return {
    userProgress: { responses: userResponses },
    questionData,
  };
  // return new Promise((res, err) => {
  //   MongoClient.connect(
  //     MONGO_CONNECTION_STRING,
  //     async (connection_err, client) => {
  //       assert.equal(connection_err, null);
  //       // const questionsDb = client.db("questions");
  //       // TODO: Fetch other lists for user
  //       // const gradeQuestionList: QuestionList =
  //       //   await getQuestionListWithDatabase(
  //       //     `${userInfo.grade}th Grade`,
  //       //     questionsDb
  //       //   );
  //       // res({
  //       //   userProgress: { responses: userResponses },
  //       //   questionData: [gradeQuestionList],
  //       // });
  //       const questionLists: QuestionList[] = await getAllQuestionLists();
  //       res({
  //         userProgress: { responses: !userResponses ? [] : userResponses },
  //         questionData: questionLists,
  //       });
  //     }
  //   );
  // });
}
