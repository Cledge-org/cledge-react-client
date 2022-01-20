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
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, pathwayId } = JSON.parse(req.body);
  return userId && pathwayId
    ? resolve.status(200).send(await getPathway(userId, pathwayId))
    : resolve.status(400).send("Both user and pathway IDs required");
};

// Gets all the pathway modules and content for a pathway ID and specific user (firebaseId)
export async function getPathway(
  userId: string,
  pathwayId: ObjectId
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
              .findOne({ _id: pathwayId }) as Promise<Pathway_Db>,
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
          title: pathway.title,
          _id: pathway._id,
          modules,
        });
      }
    );
  });
}

export const getModule = (
  moduleId: string,
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
          _id: new ObjectId(moduleId),
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
          title: module.title,
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