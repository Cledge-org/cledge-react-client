import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
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
export function getQuestionProgress(
  overrideClient?: MongoClient
): Promise<{ questionData: QuestionList[] }> {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      const questionData = await getAllQuestionLists(client);
      res({
        questionData,
      });
      if (!overrideClient) {
        client.close();
      }
    } catch (e) {
      err(e);
    }
  });
}
