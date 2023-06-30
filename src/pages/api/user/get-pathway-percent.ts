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
      const data = await getPathwayPercent(userId);
      resolve.status(data ? 200 : 404).send(data);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }  
};

export const getPathwayPercent = (userId: string): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const users_db = client.db("pathways");
      const user = (await users_db
        .collection("progress-by-user")
        .findOne(
            { firebaseId: userId },
        ));
      if (!user) {
        res(null);
      } else {
        let finished = 0;
        let total = 0;
        if (user) {
          Object.entries(user).forEach((entry) => {
            if (entry[0] != "id" && entry[0] != "firebaseId") {
              Object.entries(entry[1]).forEach((nEntry) => {
                total++;
                // @ts-ignore
                if (nEntry[1].finished == true) {
                  finished++;
                }
              }) 
            }
          })
        }
        let ret = Math.round((finished / total) * 100)
        res({
          userData: ret
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}