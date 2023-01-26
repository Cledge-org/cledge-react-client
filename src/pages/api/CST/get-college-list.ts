/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CollegeDB } from "src/@types/types";
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
      const collegeList = await getCollegeList(userId);
      resolve.status(collegeList ? 200 : 404).send(collegeList);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }  
};

export const getCollegeList = (userId: string): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const users_db = client.db("users");
      const collegelist: CollegeDB = (await users_db
        .collection("college-list")
        .findOne({
          firebaseId: userId,
        })) as CollegeDB;
      if (!collegelist) {
        res(null);
      } else {
        res({
          list: collegelist.college_list,
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}