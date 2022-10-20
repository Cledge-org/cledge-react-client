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
  const { userToken, responses, userId } = JSON.parse(req.body);

  if (userId && responses) {
    try {
      const result = await putQuestionResponses(userId, responses);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No user id or responses provided");
  }
};

// Creates or updates a user's question responses by their firebase Id (string)
export const putQuestionResponses = async (
  userId: string,
  responses: UserResponse[]
): Promise<void> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      await client
        .db("users")
        .collection("question-responses")
        .updateOne(
          { firebaseId: userId },
          { $set: { responses } },
          { upsert: true }
        );
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
