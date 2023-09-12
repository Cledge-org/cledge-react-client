/* eslint-disable import/no-anonymous-default-export */
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { AnyAction } from "redux";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, academics, applicantType, insertionId, responses} = JSON.parse(
    req.body
  );
  try {
    const result = await updateAcademicsLog(userId, academics, insertionId, responses);
    resolve.status(200).send(result);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const updateAcademicsLog = (
  userId: string,
  academics: Academics | undefined,
  insertionId: string,
  responses: any
): Promise<void> => {
  if (academics !== undefined && academics._id && userId) {
    // Document should not have _id field when sent to database
    delete academics._id;
  }
  const currDate = new Date().toLocaleDateString();
  const accademicObj = {
    ...academics,
    responses
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
          existingEntry[currDate] = accademicObj;
          await collection.updateOne(
            { firebaseId: insertionId },
            { $set: { acLog: existingFbID.acLog } }
          );
        } else {
          // Append a new entry for the current date if it doesn't exist
          await collection.updateOne(
            { firebaseId: insertionId },
            { $push: { acLog: { [currDate]: accademicObj } } }
          );
        }
      } else {
        // Append a new firebase ID if it doesn't exist yet
        await collection.insertOne({
          firebaseId: insertionId,
          acLog: [{ [currDate]: accademicObj }]
        });
      }
  
      console.log("PUT ACADEMIC LOG : " + JSON.stringify(accademicObj));
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};

