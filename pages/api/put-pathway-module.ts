import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, pathwayModuleId, pathwayModule } = JSON.parse(req.body);

  if (pathwayModule) {
    try {
      const result = await putPathwayModule(pathwayModuleId, pathwayModule);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No pathway module data provided");
  }
};

// Admin API. Creates or updates a pathway - if no ID provided, will create
// pathway, otherwise will attempt to update given ID
export const putPathwayModule = (
  pathwayModuleId: ObjectId | undefined,
  pathwayModule: PathwayModule_Db
): Promise<{ moduleId: string }> => {
  if (pathwayModule._id) {
    // Document should not have _id field when sent to database
    delete pathwayModule._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!pathwayModuleId) {
        let insertedDoc = await client
          .db("pathways")
          .collection("modules")
          .insertOne(pathwayModule);
        res({
          moduleId: insertedDoc.insertedId.toString(),
        });
      } else {
        await client
          .db("pathways")
          .collection("modules")
          .updateOne({ _id: pathwayModuleId }, { $set: pathwayModule });
        res({
          moduleId: pathwayModuleId.toString(),
        });
      }
    } catch (e) {
      err(e);
    }
  });
};
