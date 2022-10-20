import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  try {
    resolve.status(200).send(await getChatbotCounselorQuestions());
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Admin API. Creates or updates a resource article - if no ID provided, will
// create article, otherwise will attempt to update given ID. If no article
// provided, will attempt to delete
export const getChatbotCounselorQuestions = async (): Promise<
  ChatbotCounselorQuestionData[]
> => {
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
    try {
      const allQuestions = (await client
        .db("chatbot")
        .collection("counselor-questions")
        .find()
        .toArray()) as unknown as ChatbotCounselorQuestionData[];
      res(allQuestions);
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
