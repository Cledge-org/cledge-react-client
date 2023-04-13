/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { UserMetaData } from "src/@types/types";

export const config = {
  api: {
    externalResolver: true,
  },
};


export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);
  if (userId) {
    try {
      const data = await putUserData(userId, null);
      resolve.status(data ? 200 : 404).send(data);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }  
};

export const putUserData = async (userId: string, newData: UserMetaData): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const users_db = client.db("users");
      const user = (await users_db
        .collection("user-metadata")
        .updateOne(
          { firebaseId: userId },
          { $set: newData },
          { upsert: true }
        )
        );

      if (!user) {
        res(null);
      } else {
        res({
          userData: user
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}