/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};


export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { collegeId } = JSON.parse(req.body);
  if (collegeId) {
    try {
      const college = await getCollegeDataById(collegeId);
      resolve.status(college ? 200 : 404).send(college);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }  
};

export const getCollegeDataById = (id_param: string): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const colleges_db = client.db("colleges");
      const data = (await colleges_db
        .collection("colleges-data")
        .findOne({
          college_id: id_param,
        })) as any;
      if (!data) {
        res(null);
      } else {
        res({
          collegeData: data
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}