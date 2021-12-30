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
        const pathwaysDb = client.db("pathways");
        const usersDb = client.db("users");

        const [pathway, accountInfo]: [Pathway_Db, AccountInfo] =
          await Promise.all([
            pathwaysDb
              .collection("pathways")
              .findOne({ _id: new ObjectId(courseId) }) as Promise<Pathway_Db>,
            usersDb.collection("users").findOne({
              _id: new ObjectId(userId),
            }) as Promise<AccountInfo>,
          ]);
        const modules: PathwayModule[] = await Promise.all(
          pathway.modules.map((moduleId) =>
            getModule(moduleId, pathwaysDb, accountInfo.tags)
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
  pathwaysDb: Db,
  userTags: string[]
): Promise<PathwayModule> => {
  return new Promise(async (res, err) => {
    try {
      // Get module with preset content
      const module: PathwayModule_Db = (await pathwaysDb
        .collection("modules")
        .findOne({ _id: new ObjectId(moduleId) })) as PathwayModule_Db;
      // Populate this module's personalized content based on user's tags
      const personalizedContent = (await pathwaysDb
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
