import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { getQuestionListWithDocumentAndDatabase } from "./get-question-list";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(await getAllQuestionLists());
};

// Admin API. Gets all question lists with chunks and data populated
export async function getAllQuestionLists(): Promise<QuestionList[]> {
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const questionsDb = client.db("questions");
        const allQuestionLists: QuestionList_Db[] = (await questionsDb
          .collection("question-lists")
          .find()
          .toArray()) as QuestionList_Db[];
        let indexOfUnclean = allQuestionLists.findIndex(
          ({ chunks }) => !chunks
        );
        while (indexOfUnclean !== -1) {
          allQuestionLists.splice(indexOfUnclean, 1);
          indexOfUnclean = allQuestionLists.findIndex(({ chunks }) => !chunks);
        }
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
