import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, pathwayModuleId, pathwayModule } = JSON.parse(req.body);
  return pathwayModule
    ? resolve
        .status(200)
        .send(await putPathwayModule(pathwayModuleId, pathwayModule))
    : resolve.status(400).send("No pathway module data provided");
};

// Admin API. Creates or updates a pathway - if no ID provided, will create
// pathway, otherwise will attempt to update given ID. Returns ID of upserted
// pathway document
export const putPathwayModule = async (
  pathwayModuleId: string | undefined,
  pathwayModule: PathwayModule_Db
): Promise<string> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          let updateResult = await client
            .db("pathways")
            .collection("modules")
            .updateOne(
              { _id: new ObjectId(pathwayModuleId) },
              { $set: pathwayModule },
              { upsert: true }
            );
          res(updateResult.upsertedId.toString());
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
