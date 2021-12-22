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
  const { userToken, userId } = req.body;
  return userId
    ? resolve.status(200).send(await getAccountInfo(userId))
    : resolve.status(400).send("No user id provided");
};

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
            .findOne({ _id: userId })) as AccountInfo
        );
      }
    );
  });
};
