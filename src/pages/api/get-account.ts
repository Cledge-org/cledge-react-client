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
      const accountInfo = await getAccountInfo(userId);
      resolve.status(200).send(accountInfo);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No user id provided");
  }
};

// Get account info by a user's account info by their firebaseId
export const getAccountInfo = async (
  userId: string,
  overrideClient?: MongoClient
): Promise<AccountInfo> => {
  return new Promise(async (res, err) => {
    try {
      const client =
        overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      res(
        (await client
          .db("users")
          .collection("users")
          .findOne({ firebaseId: userId })) as AccountInfo
      );
      if (!overrideClient) {
        client.close();
      }
    } catch (e) {
      err(e);
    }
  });
};
