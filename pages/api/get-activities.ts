import { Db, MongoClient, ObjectId } from "mongodb";
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
      const activities = await getActivities(userId);
      resolve.status(200).send(activities);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

// Gets all of a user's activities.
export function getActivities(userId: string): Promise<Activities> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const metricsDb = client.db("metrics");
      const all = await metricsDb
        .collection("extracurriculars")
        .find()
        .toArray();
      console.error(all);
      const extracurriculars: Activities = (await metricsDb
        .collection("extracurriculars")
        .findOne({
          firebaseId: userId,
        })) as Activities;
      console.error(extracurriculars);
      if (!extracurriculars) {
        res(null);
      } else {
        res({
          _id: extracurriculars._id,
          activities: extracurriculars.activities,
          overallTier: extracurriculars.overallTier,
          totalPoints: extracurriculars.totalPoints,
        });
      }
      client.close();
    } catch (e) {
      console.error(e);
      err(e);
    }
  });
}
