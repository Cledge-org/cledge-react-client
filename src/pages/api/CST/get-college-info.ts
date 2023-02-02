/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CollegeDB, CollegeInfo } from "src/@types/types";

export const config = {
  api: {
    externalResolver: true,
  },
};


export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { collegeId } = JSON.parse(req.body);
  if (collegeId) {
    try {
      const college = await getCollege(collegeId);
      resolve.status(college ? 200 : 404).send(college);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }  
};

export const getCollege = (collegeTitle: string): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const colleges_db = client.db("colleges");
      const college: CollegeInfo = (await colleges_db
        .collection("colleges")
        .findOne({
          college_name: collegeTitle,
        })) as CollegeInfo;
      if (!college) {
        res(null);
      } else {
        res({
          college: college
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}