import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatbotHistory } from "src/@types/types";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { history } = JSON.parse(req.body);

  if (history) {
    try {
      const result = await putChatbotHistory(history);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No history data provided");
  }
};

export const putChatbotHistory = async (
  history: ChatbotHistory
): Promise<void> => {
  if (history !== undefined && history._id) {
    // Document should not have _id field when sent to database
    delete history._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      await client
        .db("chatbot")
        .collection("chatbot-history")
        .insertOne(history);
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
