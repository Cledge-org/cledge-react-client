  import { MongoClient, ObjectId } from "mongodb";
  import { NextApiRequest, NextApiResponse } from "next";
  import { getEnvVariable } from "src/config/getConfig";
  import { ActivityNew } from "src/main-pages/CheckInPage/CheckInPage";

  export const config = {
    api: {
      externalResolver: true,
    },
  };

  export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    const { userId, activities ,responses, insertionId } = JSON.parse( req.body 
    );
    try {
      const result = await updateActivitiesLogs(userId, activities, insertionId, responses);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e)
    }
  };

  // Creates, deletes, or updates an activities list - if no activitiesID provided, will
  // create activity list. If activitiesID provided but no activities list, will
  // delete the document with the given activitiesID. If activitiesID and activities list
  // are provided, will update the activities list that corresponds to the given activitiesID.
  export const updateActivitiesLogs = (
    userId: string,
    activities: Activities | undefined,
    responses: ActivityNew[],
    insertionId: string
  ): Promise<void> => {
    if (activities !== undefined && activities._id && userId) {
      // Document should not have _id field when sent to database
      delete activities._id;
    }
    const currDate = new Date().toLocaleDateString();
    const activitiesObj = {
      ...activities,
      responses
    };
    return new Promise(async (res, err) => {
      try {
        const client = await MongoClient.connect(process.env.MONGO_URL);
        const db = client.db('metrics');
        const collection = db.collection('extracurriculars-log');

        const exisitingFbID = await collection.findOne({ firebaseId: insertionId });

        if (exisitingFbID) {
          const existingEntry = exisitingFbID.ecLog.find(entry => entry.hasOwnProperty(currDate));

          if(existingEntry) {
            // Updates the existing entry for the current date
            existingEntry[currDate] = activitiesObj;
            await collection.updateOne( 
              { firebaseId: insertionId },
              { $set: { ecLog: exisitingFbID.ecLog } }
            );
          } else {
            // Append a new entry for current date if it doesn't already exist
            await collection.updateOne(
              { firebaseId: insertionId },
              { $push: { ecLog: { [currDate]: activitiesObj }}}
            );
          }
        } else {
          // Append a new firebase ID if it doesn't exist yet
          await collection.insertOne({
            firebaseId: insertionId,
            ecLog: [{ [currDate] : activitiesObj }]
          });
        }
        res();
        client.close();
      } catch (e) {
        err(e);
      }
    })
  };
