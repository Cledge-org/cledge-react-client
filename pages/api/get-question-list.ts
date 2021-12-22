import { Db, MongoClient, ObjectId } from "mongodb";
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
  return resolve.status(200).send(getQuestionList("TEST_LIST_NAME"));
};

// Gets a question list with its chunks populated
export async function getQuestionList(listName: string): Promise<QuestionList> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const questionsDb = client.db("questions");
        res(await getQuestionListWithDatabase(listName, questionsDb));
      }
    );
  });
}

// Gets and populates list given its name and database
export const getQuestionListWithDatabase = (
  listName: string,
  questionsDb: Db
): Promise<QuestionList> => {
  return new Promise(async (res, err) => {
    try {
      const gradeQuestionList: QuestionList_Db = (await questionsDb
        .collection("question-lists")
        .findOne({ name: listName })) as QuestionList_Db;
      // Question list chunks are currently just chunk ids, we need to fetch from database
      const gradeQuestionChunks: QuestionChunk[] = (await Promise.all(
        gradeQuestionList.chunks.map((chunkName: any) =>
          getQuestionChunk(chunkName, questionsDb)
        )
      )) as QuestionChunk[];
      // Populate question list chunks
      res({ _id: gradeQuestionList._id, name: gradeQuestionList.name, chunks: gradeQuestionChunks });
    } catch (e) {
      err(e);
    }
  });
};

// Gets and populates list given its database document and database
export const getQuestionListWithDocumentAndDatabase = (
  list: QuestionList_Db,
  questionsDb: Db
): Promise<QuestionList> => {
  return new Promise(async (res, err) => {
    try {
      const gradeQuestionChunks: QuestionChunk[] = (await Promise.all(
        list.chunks.map((chunkName: any) =>
          getQuestionChunk(chunkName, questionsDb)
        )
      )) as QuestionChunk[];
      // Populate question list chunks
      res({ _id: list._id, name: list.name, chunks: gradeQuestionChunks });
    } catch (e) {
      err(e);
    }
  });
};

// Gets and populates chunk given its name and database
const getQuestionChunk = (
  chunkName: string,
  questionsDb: Db
): Promise<QuestionChunk> => {
  return new Promise(async (res, err) => {
    try {
      const chunk: QuestionChunk_Db = (await questionsDb
        .collection("question-chunks")
        .findOne({ name: chunkName })) as QuestionChunk_Db;
      // Chunk questions are currently just question ids, we need to fetch from database
      const chunkQuestions: Question[] = (await Promise.all(
        chunk.questions.map((questionId) =>
          questionsDb
            .collection("question-data")
            .findOne({ _id: new ObjectId(questionId) })
        )
      )) as Question[];
      res({ _id: chunk._id, name: chunk.name, questions: chunkQuestions });
    } catch (e) {
      err(e);
    }
  });
};
