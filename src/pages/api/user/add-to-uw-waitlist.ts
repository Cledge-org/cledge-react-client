import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { data } = JSON.parse(req.body);

  if (!data) {
    resolve.status(400).send("No data given");
  }
  try {
    const result = await putWaitlistData(data);
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const putWaitlistData = async (data: any): Promise<void> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
      await client.db("users").collection("uw-waitlist").insertOne(data);
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
