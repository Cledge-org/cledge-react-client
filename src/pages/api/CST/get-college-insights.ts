import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";


export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const { college_id } = req.body;
    const collegeInsightResults = await getCollegeInsights(college_id);
    resolve.status(200).send(collegeInsightResults);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Returns college insights information for a given collegeId
export const getCollegeInsights = (collegeId: String): Promise<Object> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const collegedata_db = await client.db("colleges");
      const singleCollegeData = await collegedata_db
        .collection("college-insights")
        .findOne({ college_id: collegeId });
      res(singleCollegeData);
    } catch (e) {
      err(res);
    }
  });
};
