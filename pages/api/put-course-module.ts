import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, courseModuleId, courseModule } = req.body;
  return courseModule
    ? resolve
        .status(200)
        .send(await putCourseModule(courseModuleId, courseModule))
    : resolve.status(400).send("No course module data provided");
};

// Admin API. Creates or updates a course - if no ID provided, will create
// course, otherwise will attempt to update given ID. Returns ID of upserted
// course document
export const putCourseModule = async (
  courseModuleId: string | undefined,
  courseModule: CourseModule_Db
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
              { _id: courseModuleId },
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