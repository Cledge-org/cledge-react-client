import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

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
      resolve.status(academics ? 200 : 404).send(academics);
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
      const academics: Academics = (await metricsDb
        .collection("academics")
        .findOne({
          firebaseId: userId,
        })) as Academics;
      if (!academics) {
        res(null);
      } else {
        res({
          _id: academics._id,
          classes: academics.classes,
          overallClassTier: academics.overallClassTier,
          classTip: academics.classTip,
          gpa: academics.gpa,
          gpaTier: academics.gpaTier,
          gpaTip: academics.gpaTip,
          satScore: academics.satScore,
          actScore: academics.actScore,
          testTip: academics.testTip,
          overallTier: academics.overallTier,
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
