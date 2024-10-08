import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, pathwayModuleId, pathwayModule } = JSON.parse(req.body);

  if (pathwayModule || pathwayModuleId) {
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
// pathway module, otherwise will attempt to update given ID. If no pathway
// module provided, will attempt to delete
export const putPathwayModule = (
  pathwayModuleId: ObjectId | undefined,
  pathwayModule: PathwayModule_Db | undefined
): Promise<{ moduleId: ObjectId }> => {
  if (pathwayModule !== undefined && pathwayModule._id) {
    // Document should not have _id field when sent to database
    delete pathwayModule._id;
  }
  if (pathwayModuleId && !(pathwayModuleId instanceof ObjectId)) {
    pathwayModuleId = new ObjectId(pathwayModuleId);
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!pathwayModuleId && pathwayModule) {
        let insertedDoc = await client
          .db("pathways")
          .collection("modules")
          .insertOne(pathwayModule);
        res({ moduleId: insertedDoc.insertedId });
      } else if (pathwayModuleId && !pathwayModule) {
        await client
          .db("pathways")
          .collection("modules")
          .deleteOne({ _id: pathwayModuleId });
        res({ moduleId: pathwayModuleId });
      } else if (pathwayModuleId && pathwayModule) {
        await client
          .db("pathways")
          .collection("modules")
          .updateOne(
            { _id: pathwayModuleId },
            { $set: pathwayModule },
            { upsert: true }
          );
        res({ moduleId: pathwayModuleId });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
