/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface props {
  referral_code: string
  userId: string
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { referral_code, userId }: props = JSON.parse(req.body);
  try {
    const result = await updateReferralList(referral_code, userId);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateReferralList = (
  referral_code: string,
  userId: string,
): Promise<void> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db('users');
      const collection = db.collection('referral-list');
      
      const existingFbID = await collection.findOne({ referralCode: referral_code });
      
      if (existingFbID) {
        // Append a new entry for the current date if it doesn't exist
        await collection.updateOne(
          { referralCode: referral_code },
          { $addToSet: { referralList: userId } }
        );
      } else {
        // Append a new firebase ID if it doesn't exist yet
        await collection.insertOne({
          referralCode: referral_code,
          referralList: [ userId ]
        });
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  })
}

