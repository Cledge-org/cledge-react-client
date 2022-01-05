import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../secrets";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, pathwayModuleId, pathwayModule } = req.body;
  return pathwayModule
    ? resolve
        .status(200)
        .send(await putPathwayModule(pathwayModuleId, pathwayModule))
    : resolve.status(400).send("No pathway module data provided");
};

// Admin API. Creates or updates a pathway - if no ID provided, will create
// pathway, otherwise will attempt to update given ID
export const putPathwayModule = async (
  pathwayModuleId: ObjectId | undefined,
  pathwayModule: PathwayModule_Db
): Promise<void> => {
  if (pathwayModule._id) {
    // Document should not have _id field when sent to database
    delete pathwayModule._id;
  }
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          if (!pathwayModuleId) {
            await client
              .db("pathways")
              .collection("modules")
              .insertOne(pathwayModule);
          } else {
            await client
              .db("pathways")
              .collection("modules")
              .updateOne({ _id: pathwayModuleId }, { $set: pathwayModule });
          }
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
