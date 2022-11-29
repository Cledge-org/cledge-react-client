import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { chatbotData, chatbotDataId } = JSON.parse(req.body);

  if (chatbotData || chatbotDataId) {
    try {
      const result = await putChatbotCounselorQuestion(
        chatbotDataId,
        chatbotData
      );
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No article provided");
  }
};

export const putChatbotCounselorQuestion = async (
  chatbotDataId: ObjectId,
  chatbotData: ChatbotCounselorQuestionData
): Promise<void> => {
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      if (chatbotDataId && !chatbotData) {
        await client
          .db("chatbot")
          .collection("counselor-questions")
          .deleteOne({ _id: chatbotDataId });
      } else if (chatbotDataId && chatbotData) {
        await client
          .db("chatbot")
          .collection("counselor-questions")
          .updateOne(
            { _id: chatbotDataId },
            { $set: chatbotData },
            { upsert: true }
          );
      } else {
        await client
          .db("chatbot")
          .collection("counselor-questions")
          .insertOne(chatbotData);
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
