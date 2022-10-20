import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";
import { getQuestionListByDocument } from "./get-question-list";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const allQuestionLists = await getAllQuestionLists();
    resolve.status(200).send(allQuestionLists);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Admin API. Gets all question lists with chunks and data populated
export function getAllQuestionLists(
  overrideClient?: MongoClient
): Promise<QuestionList[]> {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ??
        (await MongoClient.connect(getEnvVariable("MONGO_URL")));
      const questionsDb = client.db("questions");
      const allQuestionLists: QuestionList_Db[] = (await questionsDb
        .collection("question-lists")
        .find()
        .toArray()) as QuestionList_Db[];
      let indexOfUnclean = allQuestionLists.findIndex(({ chunks }) => !chunks);
      while (indexOfUnclean !== -1) {
        allQuestionLists.splice(indexOfUnclean, 1);
        indexOfUnclean = allQuestionLists.findIndex(({ chunks }) => !chunks);
      }
      res(
        (await Promise.all(
          allQuestionLists.map((list) =>
            getQuestionListByDocument(list, client)
          )
        )) as QuestionList[]
      );
      if (!overrideClient) {
        client.close();
      }
    } catch (e) {
      err(e);
    }
  });
}
