import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve
    .status(200)
    .send(getProgressInfo("TEST_USER_ID", "TEST_COURSE_ID"));
};

export async function getProgressInfo(
  userId: string,
  courseId: string
): Promise<Course> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const coursesDb = client.db("courses");
        const usersDb = client.db("users");
        const course: Course_Db = (await coursesDb
          .collection("courses")
          .findOne({ _id: courseId })) as Course_Db;
        const modules: CourseModule[] = await Promise.all(
          course.modules.map((moduleId) =>
            getModule(moduleId, userId, coursesDb, usersDb)
          )
        );
        res({ tags: course.tags, title: course.title, modules });
      }
    );
  });
}

const getModule = (
  moduleId: string,
  userId: string,
  coursesDb: Db,
  usersDb: Db
): Promise<CourseModule> => {
  return new Promise(async (res, err) => {
    try {
      // Get module with preset content
      const module: CourseModule_Db = (await coursesDb
        .collection("modules")
        .findOne({ _id: moduleId })) as CourseModule_Db;
      // TODO: Populate personalized content based on user
      res({
        title: module.title,
        presetContent: module.presetContent,
        personalizedContent: [],
      });
    } catch (e) {
      err(e);
    }
  });
};
