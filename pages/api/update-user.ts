import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

// Sets a user in the database given their user ID to the given AccountInfo
// object
// TODO: validate AccountInfo object (userInfo) is valid
export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, userInfo } = JSON.parse(req.body);
  console.error(userInfo);
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
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          // Remove undefined and null fields in user as to not delete them
          for (const propName in user) {
            if (user[propName] === null || user[propName] === undefined)
              delete user[propName];
          }
          await client
            .db("users")
            .collection("users")
            .updateOne({ firebaseId }, { $set: user });
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
