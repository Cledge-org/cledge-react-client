import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { email } = req.body;

  if (!email) {
    resolve.status(400).send("No email given");
  }
  try {
    const result = await putEmail(email);
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const putEmail = async (email: string): Promise<void> => {
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      let mailList = (
        await client
          .db("users")
          .collection("waitlist")
          .findOne({ _id: new ObjectId("625da30314c88215e08f9676") })
      ).mailList;
      mailList.push(email);
      await client
        .db("users")
        .collection("waitlist")
        .updateOne(
          { _id: new ObjectId("625da30314c88215e08f9676") },
          { $set: mailList },
          { upsert: true }
        );
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
