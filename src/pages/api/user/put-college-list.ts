/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CollegeDB, collegeListElementRaw, collegeListIndividualInfo } from "src/@types/types";
import { getEnvVariable } from "src/config/getConfig";

interface props {
  user_id: string,
  college_list: collegeListIndividualInfo[];
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, college_list }: props = req.body;
  // console.log(user_id);
  // console.log(college_list);
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const userDb = client.db("users");
    await userDb
      .collection("college-list")
      .updateOne(
        { firebaseId: user_id },
        { $set: { college_list: college_list } },
        { upsert: true }
      )
      res.status(200).json({ message: "College list updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "error occured", error: e });
  }
};