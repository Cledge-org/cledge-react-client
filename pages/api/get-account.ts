import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId } = JSON.parse(req.body);
  console.error(userId);
  return userId
    ? resolve.status(200).send(await getAccountInfo(userId))
    : resolve.status(400).send("No user id provided");
};

// Get account info by a user's account info by their firebaseId
export const getAccountInfo = async (userId: string): Promise<AccountInfo> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
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
