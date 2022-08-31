import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);
  if (userId) {
    try {
      const academics = await getAcademics(userId);
      resolve.status(200).send(academics);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

// Gets all of a user's academics.
export function getAcademics(userId: string): Promise<Academics> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const metricsDb = client.db("metrics");
      const all = await metricsDb.collection("academics").find().toArray();
      console.log(all);
      const academics: Academics = (await metricsDb
        .collection("academics")
        .findOne({
          firebaseId: userId,
        })) as Academics;
      console.log(academics);
      if (!academics) {
        res(null);
      } else {
        res({
          _id: academics._id,
          classes: academics.classes,
          overallClassTier: academics.overallClassTier,
          gpa: academics.gpa,
          gpaTier: academics.gpaTier,
          satScore: academics.satScore,
          actScore: academics.actScore,
          overallTier: academics.overallTier,
        });
      }
      client.close();
    } catch (e) {
      console.log(e);
      err(e);
    }
  });
}
