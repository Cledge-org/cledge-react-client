/* eslint-disable import/no-anonymous-default-export */
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const {
    userId,
    activities,
    insertionId,
  }: { userId: string; activities: Activities; insertionId: string } =
    JSON.parse(req.body);
  try {
    if (activities) {
      for (let i = 0; i < activities.activities.length; i++) {
        activities.activities[i].tip = getActivityTip(
          activities.activities[i].tier,
          activities.activities[i].category
        );
      }
    }
    const result = await updateActivitiesLog(userId, activities, insertionId);
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Creates, deletes, or updates an activities list - if no activitiesID provided, will
// create activity list. If activitiesID provided but no activities list, will
// delete the document with the given activitiesID. If activitiesID and activities list
// are provided, will update the activities list that corresponds to the given activitiesID.
export const updateActivitiesLog = (
  userId: string,
  activities: Activities | undefined,
  insertionId: string
): Promise<void> => {
  if (activities !== undefined && activities._id && userId) {
    // Document should not have _id field when sent to database
    delete activities._id;
  }
  const currDate = new Date().toLocaleDateString();
  const extracurricularActivitiesObj = {
    activities
  };
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db('metrics')
      const collection = db.collection('extracurriculars-log')

      const existingFbID = await collection.findOne({ firebaseId: insertionId })

      if (existingFbID) {
        const existingEntry = existingFbID.ecLog.find(entry => entry.hasOwnProperty(currDate));

        if(existingEntry) {
          existingEntry[currDate] = extracurricularActivitiesObj;
          await collection.updateOne(
            { firebaseId: insertionId },
            { $set: { ecLog: existingFbID.ecLog } }
          );
        } else {
          await collection.updateOne(
            { firebaseId: insertionId },
            { $push: { acLog: { [currDate]: extracurricularActivitiesObj } } }
          );
        } 
      } else {
        await collection.insertOne({ 
          firebaseId: insertionId,
          ecLog : [ { [currDate]: extracurricularActivitiesObj}]
        })
      }

      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};

// Gets a user's GPA tip based on their GPA tier.
function getActivityTip(tier: number, category: number): string {
  try {
    const bar1 = 3;
    const bar2 = 6;
    const bar3 = 9;
    let activityTip = "";
    if (tier <= bar1) {
      activityTip =
        "We believe you have a lot of room to grow in this activity. https://cledge.org/blog/getting-started-producing-a-strong-extracurricular-profile";
    } else if (tier <= bar2) {
      activityTip =
        "We believe you have some room to grow in this activity. https://cledge.org/blog/pushing-toward-a-strong-set-of-extracurriculars";
    } else if (tier <= bar3) {
      activityTip =
        "We believe you have some room to grow in this activity. https://cledge.org/blog/improving-an-already-strong-extracurricular-profile";
    } else {
      activityTip =
        "Great job! We believe you are doing great at this activity. https://cledge.org/blog/next-steps-after-achieving-an-excellent-extracurricular-profile";
    }
    return activityTip;
  } catch (e) {
    console.log(e);
  }
}
