import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication of user token (note: separate from user id, which is
  // of the user id we're modifying for)
  const { userToken, userId, courseModuleId, personalizedContent } = req.body;
  return userId && courseModuleId && personalizedContent
    ? resolve
        .status(200)
        .send(
          await putPersonalizedCourseModuleContent(
            userId,
            courseModuleId,
            personalizedContent
          )
        )
    : resolve
        .status(400)
        .send(
          "User ID, course module ID, and personalized content modules are all required."
        );
};

// Admin API. Creates or updates personalized content for a specified user and
// module (given user id and module's database id)
export const putPersonalizedCourseModuleContent = async (
  userId: string,
  courseModuleId: string,
  personalizedContent: CourseModulePersonalizedContent[]
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          await client
            .db("users")
            .collection("personalized-modules")
            .updateOne(
              { _id: userId },
              { $set: { [courseModuleId]: personalizedContent } },
              { upsert: true }
            );
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
