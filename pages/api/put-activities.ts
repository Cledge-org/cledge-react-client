import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { activitiesId, activities } = JSON.parse(req.body);
  console.log(activities);
  try {
    const result = await putActivities(activitiesId, activities);
    resolve.status(200).send(result);
  } 
  catch (e) {
    resolve.status(500).send(e);
  }
};

// Creates, deletes, or updates an activities list - if no activitiesID provided, will
// create activity list. If activitiesID provided but no activities list, will
// delete the document with the given activitiesID. If activitiesID and activities list
// are provided, will update the activities list that corresponds to the given activitiesID.
export const putActivities = (
    activitiesId: ObjectId | undefined,
    activities: Activities | undefined
  ): Promise<void> => {
    console.log("in function");
    if (activities !== undefined && activities._id) {
      // Document should not have _id field when sent to database
      delete activities._id;
    }
    console.log("in promise");
    return new Promise(async (res, err) => {
      try {
        const client = await MongoClient.connect(process.env.MONGO_URL);
        if (!activitiesId && activities) {
          console.log("in insert");
          await client
            .db("metrics")
            .collection("extracurriculars")
            .insertOne(activities);
        } 
        else if (activitiesId && !activities) {
          console.log("in delete");
          await client
            .db("metrics")
            .collection("extracurriculars")
            .deleteOne({ _id: activitiesId });
        } else if (activitiesId && activities) {
          console.log("in update");
          await client
            .db("metrics")
            .collection("extracurriculars")
            .updateOne({ _id: activitiesId }, { $set: activities });
        }
        console.log("at end of function");
        res();
        client.close();
      } catch (e) {
        err(e);
      }
    });
  };