/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, academics, applicantType, insertionId } = JSON.parse(
    req.body
  );
  try {
    const result = await updateAcademicsLog(userId, academics, insertionId);
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const updateAcademicsLog = (
  userId: string,
  academics: Academics | undefined,
  insertionId: string
): Promise<void> => {
  if (academics !== undefined && academics._id && userId) {
    // Document should not have _id field when sent to database
    delete academics._id;
  }
  const currDate = new Date().toLocaleDateString();
  // const currDate = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
  const timeStampObject = {
    academics
  };
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db('metrics');
      const collection = db.collection('academics-log');
      
      const existingFbID = await collection.findOne({ firebaseId: insertionId });
      
      if (existingFbID) {
        const existingEntry = existingFbID.acLog.find(entry => entry.hasOwnProperty(currDate));
        
        if (existingEntry) {
          // Update the existing entry for the current date
          existingEntry[currDate] = timeStampObject;
          await collection.updateOne(
            { firebaseId: insertionId },
            { $set: { acLog: existingFbID.acLog } }
          );
        } else {
          // Append a new entry for the current date if it doesn't exist
          await collection.updateOne(
            { firebaseId: insertionId },
            { $push: { acLog: { [currDate]: timeStampObject } } }
          );
        }
      } else {
        // Append a new firebase ID if it doesn't exist yet
        await collection.insertOne({
          firebaseId: insertionId,
          acLog: [{ [currDate]: timeStampObject }]
        });
      }
  
      console.log("PUT ACADEMIC LOG : " + JSON.stringify(timeStampObject));
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};

