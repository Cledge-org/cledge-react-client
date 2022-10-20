import { MongoClient } from "mongodb";
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
      const activities = await getActivities(userId);
      resolve.status(activities ? 200 : 404).send(activities);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

// Gets all of a user's activities.
export function getActivities(userId: string): Promise<Activities> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
      const metricsDb = client.db("metrics");
      const extracurriculars: Activities = (await metricsDb
        .collection("extracurriculars")
        .findOne({
          firebaseId: userId,
        })) as Activities;
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
