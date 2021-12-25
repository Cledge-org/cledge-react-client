import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId, pathwayId } = JSON.parse(req.body);
  return !userId || !pathwayId
    ? resolve.status(400).send("No userId or courseId provided")
    : resolve.status(200).send(getPathway(userId, pathwayId));
};

// Gets all the pathway modules and content for a pathway ID and specific user
export async function getPathway(
  userId: string,
  courseId: string
): Promise<Pathway> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const coursesDb = client.db("courses");
        const usersDb = client.db("users");

        const [pathway, accountInfo]: [Pathway_Db, AccountInfo] =
          await Promise.all([
            coursesDb
              .collection("courses")
              .findOne({ _id: new ObjectId(courseId) }) as Promise<Pathway_Db>,
            usersDb.collection("users").findOne({
              _id: new ObjectId(userId),
            }) as Promise<AccountInfo>,
          ]);
        const modules: PathwayModule[] = await Promise.all(
          pathway.modules.map((moduleId) =>
            getModule(moduleId, coursesDb, accountInfo.tags)
          )
        );
        res({
          tags: pathway.tags,
          title: pathway.title,
          _id: pathway._id,
          modules,
        });
      }
    );
  });
}

const getModule = (
  moduleId: string,
  coursesDb: Db,
  userTags: string[]
): Promise<PathwayModule> => {
  return new Promise(async (res, err) => {
    try {
      // Get module with preset content
      const module: PathwayModule_Db = (await coursesDb
        .collection("modules")
        .findOne({ _id: new ObjectId(moduleId) })) as PathwayModule_Db;
      // Populate this module's personalized content based on user's tags
      const personalizedContent = (await coursesDb
        .collection("personalized-content")
        .find({ tags: { $in: userTags }, moduleId })
        .toArray()) as PersonalizedContent[];
      res({
        _id: module._id,
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
