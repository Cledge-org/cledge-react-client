import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getAccountInfo } from "./get-account";
import { getQuestionResponses } from "./get-question-responses";
import AuthFunctions from "./auth/firebase-auth";
import { getAllQuestionLists } from "./get-all-questions";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);

  if (userId) {
    try {
      const questionProgress = await getQuestionProgress(userId);
      resolve.status(200).send(questionProgress);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No user Id provided");
  }
};

// Gets all user responses to relevant questions by a user's firebaseId
export function getQuestionProgress(
  userId: string,
  overrideClient?: MongoClient
): Promise<ProgressInfo> {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      const [userResponses, userInfo, questionData] = await Promise.all([
        getQuestionResponses(userId, client),
        getAccountInfo(userId, client),
        getAllQuestionLists(client),
      ]);
      res({
        userTags: userInfo.tags,
        userProgress: { responses: userResponses },
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
