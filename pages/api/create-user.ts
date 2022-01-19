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
  const { name, address, grade, birthday, email, userId, tags } = JSON.parse(
    req.body
  );
  if (
    !name ||
    address === undefined ||
    grade === undefined ||
    !birthday ||
    !email ||
    !tags
  ) {
    resolve
      .status(400)
      .send(
        "User creation missing one of: name, address, grade, birthday, email, or tags."
      );
  } else {
    try {
      await createUser({
        firebaseId: userId,
        name,
        address,
        grade,
        birthday,
        email,
        tags,
        checkIns: ["Onboarding Questions"],
      });
      resolve.status(200).send("Success");
    } catch (e) {
      console.log(e);
      resolve.status(500).send(e);
    }
  }
};

// Creates a new user with specified account info
export const createUser = async (user: AccountInfo): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          await client.db("users").collection("users").insertOne(user);
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
