import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const { activitiesId } = JSON.parse(req.body);
    if(activitiesId) {
        try {
            const activities = await getActivities(activitiesId);
            resolve.status(200).send(activities);
        } 
        catch (e) {
            resolve.status(500).send(e);
        }
    }
};

// Gets all of a user's activities.
export function getActivities(activitiesId: ObjectId): Promise<Activities> {
    return new Promise(async (res, err) => {
      try {
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const metricsDb = client.db("metrics");
        const extracurriculars: Activities = (await metricsDb
          .collection("extracurriculars").findOne({
            _id:
            activitiesId instanceof ObjectId
              ? activitiesId
              : new ObjectId(activitiesId),
          }) as Activities);
        if (!extracurriculars) {
            res(null);
        } 
        else {
            res({
            _id: extracurriculars._id,
            activities: extracurriculars.activities,
            overallTier: extracurriculars.overallTier,
            totalPoints: extracurriculars.totalPoints,
            });
        } 
        client.close();
    }
    catch (e) {
        err(e);
    }
    });
}