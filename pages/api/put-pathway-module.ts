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
  const { userToken, courseModuleId, courseModule } = JSON.parse(req.body);
  return courseModule
    ? resolve
        .status(200)
        .send(await putCourseModule(courseModuleId, courseModule))
    : resolve.status(400).send("No pathway module data provided");
};

// Admin API. Creates or updates a pathway - if no ID provided, will create
// pathway, otherwise will attempt to update given ID. Returns ID of upserted
// pathway document
export const putCourseModule = async (
  courseModuleId: string | undefined,
  courseModule: PathwayModule_Db
): Promise<string> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          let updateResult = await client
            .db("courses")
            .collection("modules")
            .updateOne(
              { _id: new ObjectId(courseModuleId) },
              { $set: courseModule },
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
