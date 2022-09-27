import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatbotHistory } from "src/@types/types";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, offset, numIndecies } = JSON.parse(req.body);
  if (userId) {
    try {
      const activities = await getChatbotHistory(userId, offset, numIndecies);
      resolve.status(activities ? 200 : 404).send(activities);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

// Gets chatbot history.
export function getChatbotHistory(
  userId: string,
  offset: number,
  numIndecies: number
): Promise<ChatbotHistory[]> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const chatbotDb = client.db("chatbot");
      const chatbotHistory: ChatbotHistory[] = (await chatbotDb
        .collection("chatbot-history")
        .find({
          firebaseId: userId,
          index: { $gt: offset - 2, $lt: offset },
        })
        .toArray()) as ChatbotHistory[];
      if (!chatbotHistory) {
        res([]);
      } else {
        res(chatbotHistory);
      }
      client.close();
    } catch (e) {
      console.error(e);
      err(e);
    }
  });
}
