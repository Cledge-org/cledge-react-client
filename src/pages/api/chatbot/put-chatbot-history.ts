import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatbotHistory } from "src/@types/types";
import { updateUser } from "src/pages/api/user/update-user";

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
  const { history, currHistoryLength } = JSON.parse(req.body);

  if (history) {
    try {
      const result = await putChatbotHistory(history, currHistoryLength);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No history data provided");
  }
};

export const putChatbotHistory = async (
  history: ChatbotHistory[],
  currHistoryLength: number
): Promise<void> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      let addedLists = 0;
      await Promise.all(
        history.map(async (object) => {
          if (
            object._id ||
            (await client.db("chatbot").collection("chatbot-history").findOne({
              firebaseId: object.firebaseId,
              index: object.index,
            }))
          ) {
            delete object._id;
            await client.db("chatbot").collection("chatbot-history").updateOne(
              {
                firebaseId: object.firebaseId,
                index: object.index,
              },
              { $set: object }
            );
          } else {
            addedLists++;
            await client
              .db("chatbot")
              .collection("chatbot-history")
              .insertOne(object as ModifiedChatbotHistory);
          }
          if (addedLists > 0) {
            updateUser(history[0].firebaseId, currHistoryLength + addedLists);
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
