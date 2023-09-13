import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, activities, insertionId, responses } = JSON.parse(
    req.body
  );
  try {
    const result = await updateActivitiesLog(userId, activities, insertionId, responses);
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const updateActivitiesLog = (
  userId: string,
  activities: Activities | undefined,
  insertionId: string,
  responses: any
): Promise<void> => {
  if (activities !== undefined && activities._id && userId) {
    // Document should not have _id field when sent to database
    delete activities._id;
  }
  const currDate = new Date().toLocaleDateString();
  const activitiesObj = {
    activities,
    responses
  };
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db('metrics');
      const collection = db.collection('extracurriculars-log');
      
      const existingFbID = await collection.findOne({ firebaseId: insertionId });
      
      if (existingFbID) {
        const existingEntry = existingFbID.ecLog.find(entry => entry.hasOwnProperty(currDate));
        
        if (existingEntry) {
          // Update the existing entry for the current date
          existingEntry[currDate] = activitiesObj;
          await collection.updateOne(
            { firebaseId: insertionId },
            { $set: { ecLog: existingFbID.ecLog } }
          );
        } else {
          // Append a new entry for the current date if it doesn't exist
          await collection.updateOne(
            { firebaseId: insertionId },
            { $push: { ecLog: { [currDate]: activitiesObj } } }
          );
        }
      } else {
        // Append a new firebase ID if it doesn't exist yet
        await collection.insertOne({
          firebaseId: insertionId,
          ecLog: [{ [currDate]: activitiesObj }]
        });
      }
  
      console.log("PUT EXTRACURRICULAR LOG : " + JSON.stringify(activitiesObj));
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
