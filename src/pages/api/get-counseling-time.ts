import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);
  if(!userId) {
    resolve.status(400).send("No user id provided");
  } else {
    try {
      const result = await getTime(userId);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

//Returns counseling time from database given inputted user id
export const getTime = async (
  userId: string,
  overrideClient?: MongoClient
): Promise<number> => {
  return new Promise(async (res, err) => {
    try{
      const client = overrideClient ?? (await MongoClient.connect(process.env.MONGO_URL));
      const result = await client
        .db("users")
        .collection("counseling-time")
        .findOne(
          { firebaseId: userId }
        );
      res(result.time);
      client.close();
    } catch(e) {
      err(e);
    }
  });
}

