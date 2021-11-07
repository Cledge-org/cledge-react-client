import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { name, address, grade, birthday, email } = req.body;
  try {
    await createUser({
      name,
      address,
      grade,
      birthday,
      email,
    });
    resolve.status(200).send("Success");
  } catch (e) {
    resolve.status(500).send(e);
  }
};

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
