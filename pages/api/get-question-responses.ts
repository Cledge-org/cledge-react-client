import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userId } = JSON.parse(req.body);

  if (userId) {
    try {
      const questionResponses = await getQuestionResponses(userId);
      resolve.status(200).send(questionResponses);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No user Id provided");
  }
};

// Gets a user's question responses by a user's firebaseId
export const getQuestionResponses = (
  userId: string,
  overrideClient?: MongoClient
): Promise<UserResponse[]> => {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      const user_responses = (await client
        .db("users")
        .collection("question-responses")
        .findOne({ firebaseId: userId })) as UserProgress_Db;
      if (!user_responses) {
        res([]);
      } else {
        res(user_responses.responses);
      }
      if (!overrideClient) {
        client.close();
      }
    } catch (e) {
      err(e);
    }
  });
};
