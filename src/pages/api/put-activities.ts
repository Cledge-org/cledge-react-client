import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, activities }: { userId: string; activities: Activities } =
    JSON.parse(req.body);
  try {
    const session = getSession({ req });
    if (activities) {
      for (let i = 0; i < activities.activities.length; i++) {
        activities.activities[i].tip = getActivityTip(
          activities.activities[i].tier,
          activities.activities[i].category
        );
      }
    }
    const result = await putActivities(
      userId,
      activities,
      (
        await session
      ).user.uid
    );
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Creates, deletes, or updates an activities list - if no activitiesID provided, will
// create activity list. If activitiesID provided but no activities list, will
// delete the document with the given activitiesID. If activitiesID and activities list
// are provided, will update the activities list that corresponds to the given activitiesID.
export const putActivities = (
  userId: string,
  activities: Activities | undefined,
  insertionId: string
): Promise<void> => {
  if (activities !== undefined && activities._id && userId) {
    // Document should not have _id field when sent to database
    delete activities._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!userId && activities && insertionId) {
        await client
          .db("metrics")
          .collection("extracurriculars")
          .insertOne({
            firebaseId: insertionId,
            ...activities,
          });
      } else if (userId && !activities) {
        await client.db("metrics").collection("extracurriculars").deleteOne({
          firebaseId: userId,
        });
      } else if (userId && activities) {
        await client.db("metrics").collection("extracurriculars").updateOne(
          {
            firebaseId: userId,
          },
          { $set: activities }
        );
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
    if (category == 1) {
      if (tier <= bar1) {
        activityTip =
          "We believe you have a lot of room to grow in this activity. Link to Tier 1-3 stem document";
      } else if (tier <= bar2) {
        activityTip =
          "We believe you have some room to grow in this activity. Link to Tier 4-6 stem document";
      } else if (tier <= bar3) {
        activityTip =
          "We believe you have some room to grow in this activity. Link to Tier 7-9 stem document";
      } else {
        activityTip =
          "Great job! We believe you are doing great at this activity. Link to Tier 10-12 stem document";
      }
    } else {
      if (tier <= bar1) {
        activityTip =
          "We believe you have a lot of room to grow in this activity. Link to Tier 1-3 general document";
      } else if (tier <= bar2) {
        activityTip =
          "We believe you have some room to grow in this activity. Link to Tier 4-6 general document";
      } else if (tier <= bar3) {
        activityTip =
          "We believe you have some room to grow in this activity. Link to Tier 7-9 general document";
      } else {
        activityTip =
          "Great job! We believe you are doing great at this activity. Link to Tier 10-12 general document";
      }
    }
    return activityTip;
  } catch (e) {
    console.log(e);
  }
}
