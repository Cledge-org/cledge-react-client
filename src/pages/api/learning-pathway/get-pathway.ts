import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, pathwayId } = JSON.parse(req.body);

  if (userId && pathwayId) {
    try {
      const pathway = await getPathway(userId, pathwayId);
      resolve.status(200).send(pathway);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

// Gets all the pathway modules and content for a pathway ID and specific user (firebaseId)
export function getPathway(
  userId: string,
  pathwayId: ObjectId
): Promise<Pathway> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const pathwaysDb = client.db("pathways");
      const usersDb = client.db("users");
      const [pathway, accountInfo]: [Pathway_Db, AccountInfo] =
        await Promise.all([
          pathwaysDb.collection("pathways").findOne({
            _id:
              pathwayId instanceof ObjectId
                ? pathwayId
                : new ObjectId(pathwayId),
          }) as Promise<Pathway_Db>,
          usersDb.collection("users").findOne({
            firebaseId: userId,
          }) as Promise<AccountInfo>,
        ]);
      let modules: PathwayModule[] = await Promise.all(
        pathway.modules.map((moduleId) =>
          getModule(moduleId, pathwaysDb, accountInfo.tags)
        )
      );
      modules = modules.filter((x) => x !== null);
      res({
        tags: pathway.tags,
        name: pathway.name,
        _id: pathway._id,
        coverImage: pathway.coverImage,
        modules,
      });
      client.close();
    } catch (e) {
      err(e);
    }
  });
}

export const getModule = (
  moduleId: ObjectId,
  pathwaysDb: Db,
  userTags: string[]
): Promise<PathwayModule | null> => {
  return new Promise(async (res, err) => {
    try {
      const [module, personalizedContent]: [
        PathwayModule_Db,
        PersonalizedContent[]
      ] = await Promise.all([
        pathwaysDb.collection("modules").findOne({
          _id: moduleId instanceof ObjectId ? moduleId : new ObjectId(moduleId),
        }) as Promise<PathwayModule_Db>,
        pathwaysDb
          .collection("personalized-content")
          .find({ tags: { $in: userTags }, moduleId })
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      if (!module) {
        res(null);
      } else {
        res({
          _id: module._id,
          name: module.name,
          presetContent: module.presetContent,
          tags: module.tags,
          personalizedContent,
        });
      }
    } catch (e) {
      err(e);
    }
  });
};
