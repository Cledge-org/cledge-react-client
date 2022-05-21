import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
  QuestionList,
  QuestionList_Db,
  QuestionChunk,
  QuestionChunk_Db,
  Question,
} from "src/@types/types";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { listName } = JSON.parse(req.body);

  if (listName) {
    try {
      const list = await getQuestionList(listName);
      resolve.status(200).send(list);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No list name provided");
  }
};

// Gets a question list with its chunks populated
export const getQuestionList = (
  listName: string,
  overrideClient?: MongoClient
): Promise<QuestionList> => {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      const questionsDb = client.db("questions");
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
      res({
        _id: gradeQuestionList._id,
        name: gradeQuestionList.name,
        chunks: gradeQuestionChunks,
      });
      if (!overrideClient) {
        client.close();
      }
    } catch (e) {
      err(e);
    }
  });
};

// Gets and populates list given its database document
export const getQuestionListByDocument = (
  list: QuestionList_Db,
  overrideClient?: MongoClient
): Promise<QuestionList> => {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      const questionsDb = client.db("questions");
      const gradeQuestionChunks: QuestionChunk[] = (await Promise.all(
        list.chunks.map((chunkName: any) =>
          getQuestionChunk(chunkName, questionsDb)
        )
      )) as QuestionChunk[];
      // Populate question list chunks
      res({
        ...list,
        _id: list._id,
        name: list.name,
        chunks: gradeQuestionChunks,
      });
      if (!overrideClient) {
        client.close();
      }
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
      if (chunk === null) {
        res({ _id: null, name: "NULL CHUNK", questions: [] });
        return;
      }
      // Chunk questions are currently just question ids, we need to fetch from database
      const chunkQuestions: Question[] = (await Promise.all(
        chunk.questions.map((questionId) =>
          questionsDb.collection("question-data").findOne({
            _id:
              questionId instanceof ObjectId
                ? questionId
                : new ObjectId(questionId),
          })
        )
      )) as Question[];
      res({ _id: chunk._id, name: chunk.name, questions: chunkQuestions });
    } catch (e) {
      err(e);
    }
  });
};
