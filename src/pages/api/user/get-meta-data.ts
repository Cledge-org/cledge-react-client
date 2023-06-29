/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
        .findOneAndUpdate(
            { firebaseId: userId },
            {
                $setOnInsert: { 
                    firebaseId: userId,
                    pathwayPercentage: 0,
                    acOverall: 0,
                    ecOverall: 0
                },
            },
            {
                upsert: true,
                returnDocument: 'after'
            }
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