import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { ChatbotHistory } from "src/@types/types";
import { updateUser } from "src/pages/api/user/update-user";
import { getEnvVariable } from "src/config/getConfig";

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
        history
          .map((object) => async () => {
            if (
              object._id ||
              (await client
                .db("chatbot")
                .collection("chatbot-history")
                .findOne({
                  firebaseId: object.firebaseId,
                  index: object.index,
                }))
            ) {
              delete object._id;
              await client
                .db("chatbot")
                .collection("chatbot-history")
                .updateOne(
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
          })
          .map((func) => func())
      );
      if (addedLists > 0) {
        await updateUser(history[0].firebaseId, {
          chatbotHistoryLength: currHistoryLength + addedLists,
        });
      } else {
        const newestDoc = (
          await client
            .db("chatbot")
            .collection("chatbot-history")
            .find({ firebaseId: history[0].firebaseId })
            .sort({ index: -1 })
            .limit(1)
            .toArray()
        )[0];
        if (newestDoc && newestDoc.index + 1 !== currHistoryLength) {
          await updateUser(history[0].firebaseId, {
            chatbotHistoryLength: newestDoc.index + 1,
          });
        }
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
