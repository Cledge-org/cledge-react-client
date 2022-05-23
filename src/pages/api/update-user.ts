import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

// Sets a user in the database given their user ID to the given AccountInfo
// object
// TODO: validate AccountInfo object (userInfo) is valid
export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userInfo, userId } = JSON.parse(req.body);
  if (!userId || !userInfo) {
    resolve
      .status(400)
      .send("User ID required (userId) and User Info (userInfo)");
  } else {
    try {
      await updateUser(userId, userInfo);
      resolve.status(200).send("Success");
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

// Updates user of id with provided AccountInfo. If a field is not provided, it
// will not be updated, so its old value will remain.
export const updateUser = async (
  firebaseId: string,
  user: AccountInfo
): Promise<void> => {
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      // Remove undefined and null fields in user as to not delete them
      for (const propName in user) {
        if (user[propName] === null || user[propName] === undefined)
          delete user[propName];
      }
      await client
        .db("users")
        .collection("users")
        .updateOne({ firebaseId }, { $set: user }, { upsert: true });
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
