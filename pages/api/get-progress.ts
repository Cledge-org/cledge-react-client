import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccountInfo } from "./get-account";
import { getQuestionResponses } from "./get-question-responses";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(getProgressInfo("TEST_USER_ID"));
};

export async function getProgressInfo(userId: string): Promise<ProgressInfo> {
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
        const gradeQuestionHiearchy: QuestionHierarchy = (await questionsDb
          .collection("question-hierarchies")
          .findOne({ name: "_" + userInfo.grade })) as QuestionHierarchy;
        const gradeQuestionLists: QuestionList[] = (await Promise.all(
          gradeQuestionHiearchy.lists.map((listName: any) =>
            getQuestionList(listName, questionsDb)
          )
        )) as QuestionList[];
        res({
          userProgress: { responses: userResponses },
          questionData: [
            {
              name: gradeQuestionHiearchy.name,
              lists: gradeQuestionLists,
            },
          ],
        });
      }
    );
  });
}

const getQuestionList = (
  listName: string,
  questionsDb: Db
): Promise<QuestionList> => {
  return new Promise(async (res1, err) => {
    try {
      // Question list chunks are currently just chunk ids, populate later
      const gradeQuestionList: QuestionList = (await questionsDb
        .collection("question-lists")
        .findOne({ name: listName })) as QuestionList;
      const gradeQuestionChunks: QuestionChunk[] = (await Promise.all(
        gradeQuestionList.chunks.map((chunkName: any) =>
          getQuestionChunk(chunkName, questionsDb)
        )
      )) as QuestionChunk[];
      // Populate question list chunks
      gradeQuestionList.chunks = gradeQuestionChunks;
      res1(gradeQuestionList);
    } catch (e) {
      err(e);
    }
  });
};

const getQuestionChunk = (
  chunkName: string,
  questionsDb: Db
): Promise<QuestionChunk> => {
  return new Promise(async (res2, err) => {
    try {
      // Chunk questions are currently just question ids, populate later
      const chunk: QuestionChunk = (await questionsDb
        .collection("question-chunks")
        .findOne({ name: chunkName })) as QuestionChunk;
      const chunkQuestions: Question[] = (await Promise.all(
        chunk.questions.map((questionId) =>
          questionsDb.collection("question-data").findOne({ _id: questionId })
        )
      )) as Question[];
      // Populate questions into question chunks. Now the question chunk is finished
      chunk.questions = chunkQuestions;
      res2(chunk);
    } catch (e) {
      err(e);
    }
  });
};
