import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { Activities } from "src/@types/types";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, activities } = JSON.parse(req.body);
  try {
    const session = getSession({ req });
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
  console.error(userId);
  console.error(activities);
  console.error(insertionId);
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!userId && activities && insertionId) {
        console.error("SURPRISE");
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
