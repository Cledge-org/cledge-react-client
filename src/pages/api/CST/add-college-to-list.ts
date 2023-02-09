/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getCollege } from "./get-college-info";
import { CollegeDB, collegeListElementRaw, collegeListIndividualInfo } from "src/@types/types";

interface props {
  user_id: string,
  college_title: string;
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, college_title }: props = req.body;
  console.log(user_id);
  console.log(college_title);
  const pre_college_info = await getCollege(college_title);
  const college_info = pre_college_info["college"];
  console.log(college_info);
  const personalize: collegeListIndividualInfo = {
    college_id: college_info.college_id,
    fit_type: 0,
    img_url: college_info.img_url,
    img_title: college_info.img_title,
    college_name: college_info.college_name,
    location: college_info.location,
    in_state_tuition: college_info.in_state_tuition,
    out_state_tuition: college_info.out_state_tuition,
    college_type: college_info.college_type
  }
  console.log(JSON.stringify(college_info["college"]));
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const userDb = client.db("users");
    await userDb
      .collection("college-list")
      .updateOne(
        { firebaseId: user_id },
        { $push: { college_list: personalize } }
      )
      .then(() => {
        res.status(200).json({ message: "appended" });
      });
  } catch (e) {
    res.status(500).json({ message: "error occured", error: e });
  }
};
