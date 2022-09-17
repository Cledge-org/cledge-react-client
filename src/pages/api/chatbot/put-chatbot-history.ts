import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatbotHistory } from "src/@types/types";

export const config = {
  api: {
    externalResolver: true,
  },
};
interface ModifiedChatbotHistory extends ChatbotHistory {
  _id: ObjectId;
}

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
  history: ChatbotHistory[]
): Promise<void> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      await Promise.all(
        history.map(async (object) => {
          if (object._id) {
            delete object._id;
            await client.db("chatbot").collection("chatbot-history").updateOne(
              {
                firebaseId: object.firebaseId,
                index: object.index,
              },
              { $set: object }
            );
          } else {
            client
              .db("chatbot")
              .collection("chatbot-history")
              .insertOne(object as ModifiedChatbotHistory);
          }
        })
      );
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
