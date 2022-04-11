import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { activitiesId, activities } = JSON.parse(req.body);
  try {
    const session = getSession({ req });
    const result = await putActivities(
      activitiesId,
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
  activitiesId: ObjectId | undefined,
  activities: Activities | undefined,
  userId: string
): Promise<void> => {
  if (activities !== undefined && activities._id && activitiesId) {
    // Document should not have _id field when sent to database
    delete activities._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!activitiesId && activities) {
        await client
          .db("metrics")
          .collection("extracurriculars")
          .insertOne({
            _id: new ObjectId(userId),
            ...activities,
          });
      } else if (activitiesId && !activities) {
        await client
          .db("metrics")
          .collection("extracurriculars")
          .deleteOne({
            _id:
              activitiesId instanceof ObjectId
                ? activitiesId
                : new ObjectId(activitiesId),
          });
      } else if (activitiesId && activities) {
        await client
          .db("metrics")
          .collection("extracurriculars")
          .updateOne(
            {
              _id:
                activitiesId instanceof ObjectId
                  ? activitiesId
                  : new ObjectId(activitiesId),
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
