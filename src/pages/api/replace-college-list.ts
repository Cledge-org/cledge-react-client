import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, college_list } = req.body;
  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const userDb = client.db("users");
    await userDb
      .collection("college-list")
      .updateOne(
        { firebaseId: user_id },
        { $set: { college_list: college_list } }
      )
      .then(() => {
        res.status(200).json({ message: "done changing" });
      });
  } catch (e) {
    res.status(500).json({ message: "error occured", error: e });
  }
};
