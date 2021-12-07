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
    .send(getCourseInfo("TEST_USER_ID", "TEST_COURSE_ID"));
};

export async function getCourseInfo(
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

        const [course, accountInfo]: [Course_Db, AccountInfo] =
          await Promise.all([
            coursesDb
              .collection("courses")
              .findOne({ _id: courseId }) as Promise<Course_Db>,
            usersDb
              .collection("users")
              .findOne({ _id: userId }) as Promise<AccountInfo>,
          ]);
        const modules: CourseModule[] = await Promise.all(
          course.modules.map((moduleId) =>
            getModule(moduleId, coursesDb, accountInfo.tags)
          )
        );
        res({ tags: course.tags, title: course.title, id: course.id, modules });
      }
    );
  });
}

const getModule = (
  moduleId: string,
  coursesDb: Db,
  userTags: string[]
): Promise<CourseModule> => {
  return new Promise(async (res, err) => {
    try {
      // Get module with preset content
      const module: CourseModule_Db = (await coursesDb
        .collection("modules")
        .findOne({ _id: moduleId })) as CourseModule_Db;
      // Populate this module's personalized content based on user's tags
      const personalizedContent = (await coursesDb
        .collection("personalized-content")
        .find({ tags: { $in: userTags }, moduleId })
        .toArray()) as PersonalizedContent[];
      res({
        title: module.title,
        presetContent: module.presetContent,
        tags: module.tags,
        personalizedContent,
      });
    } catch (e) {
      err(e);
    }
  });
};
