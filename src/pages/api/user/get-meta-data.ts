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
      const data = await getUserData(userId);
      resolve.status(data ? 200 : 404).send(data);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }  
};

export const getUserData = (userId: string): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const users_db = client.db("users");
      const user = (await users_db
        .collection("user-metadata")
        .findOne({
          firebaseId: userId,
        }));

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