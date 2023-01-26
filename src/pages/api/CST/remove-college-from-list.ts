import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface props {
  user_id: string,
  college_title: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, college_title }: props = req.body;
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const userDb = client.db("users");
    await userDb
      .collection("college-list")
      .updateOne(
        { firebaseId: user_id },
        { $pull: { college_list: { college_name: college_title } } }
      )
      .then(() => {
        res.status(200).json({ message: "College removed successfully" });
      });
  } catch (e) {
    res.status(500).json({ message: "Error occured while removing college", error: e });
  }
};