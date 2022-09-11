import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { getQuestionListByDocument } from "./get-question-list";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const allCheckins = await getAllCheckins();
    resolve.status(200).send(allCheckins);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Admin API. Gets all question lists with chunks and data populated
export function getAllCheckins(
  overrideClient?: MongoClient
): Promise<QuestionList[]> {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      const questionsDb = client.db("questions");
      const allCheckins: QuestionList_Db[] = (await questionsDb
        .collection("question-lists")
        .find({ isCheckin: true })
        .toArray()) as QuestionList_Db[];
      console.error(allCheckins);
      let indexOfUnclean = allCheckins.findIndex(({ chunks }) => !chunks);
      while (indexOfUnclean !== -1) {
        allCheckins.splice(indexOfUnclean, 1);
        indexOfUnclean = allCheckins.findIndex(({ chunks }) => !chunks);
      }
      res(
        (await Promise.all(
          allCheckins.map((list) => getQuestionListByDocument(list, client))
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
