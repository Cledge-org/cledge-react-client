import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

interface props {
  user_id: string,
  percentage: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { user_id, percentage }: props = req.body;

  try {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const userDb = client.db("pathways");
    await userDb
      .collection("pathwayPercentage")
      .updateMany(
        { firebaseId: user_id },
        { $set: { percentage: percentage } },
        { upsert: true }
      )
      res.status(200).json({ message: "Pathway Percentage updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "error occured", error: e });
  }
};