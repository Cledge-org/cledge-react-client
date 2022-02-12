import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

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
export const getAccountInfo = async (userId: string): Promise<AccountInfo> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        res(
          (await client
            .db("users")
            .collection("users")
            .findOne({ firebaseId: userId })) as AccountInfo
        );
      }
    );
  });
};
