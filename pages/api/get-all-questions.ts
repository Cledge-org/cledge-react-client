import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { getQuestionListWithDocumentAndDatabase } from "./get-question-list";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(getAllQuestionLists());
};

// Admin API. Gets all question lists with chunks and data populated
export async function getAllQuestionLists(): Promise<QuestionList[]> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const questionsDb = client.db("questions");
        const allQuestionLists: QuestionList_Db[] = (await questionsDb
          .collection("question-lists")
          .find()
          .toArray()) as QuestionList_Db[];
        res(
          (await Promise.all(
            allQuestionLists.map((list) =>
              getQuestionListWithDocumentAndDatabase(list, questionsDb)
            )
          )) as QuestionList[]
        );
      }
    );
  });
}
