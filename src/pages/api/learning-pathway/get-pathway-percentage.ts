/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};


export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);
  if (userId) {
    try {
      const res = await getPathwayPercentage(userId);
      resolve.status(res ? 200 : 404).send(res);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }  
};

export const getPathwayPercentage = (userId: string): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const users_db = client.db("pathways");
      const percentage = (await users_db
        .collection("pathwayPercentage")
        .findOne({
          firebaseId: userId,
        }));
      if (!percentage) {
        res(0);
      } else {
        res({
          percentage
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}