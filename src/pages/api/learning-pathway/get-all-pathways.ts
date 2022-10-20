import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const allPathways = await getAllPathways();
    resolve.status(200).send(allPathways);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Admin API. Gets all pathways and their modules, with all their preset and
// personalized contents
export function getAllPathways(): Promise<Pathway[]> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
      const pathwaysDb = client.db("pathways");
      const pathways: Pathway_Db[] = (await pathwaysDb
        .collection("pathways")
        .find()
        .toArray()) as Pathway_Db[];
      res(
        (await Promise.all(
          pathways.map((pathway: Pathway_Db) =>
            getSpecificPathway(pathway, pathwaysDb)
          )
        )) as Pathway[]
      );
      client.close();
    } catch (e) {
      err(e);
    }
  });
}

// Takes a pathway document and its database and populates its modules
export function getSpecificPathway(
  pathway: Pathway_Db,
  pathwaysDb: Db
): Promise<Pathway> {
  return new Promise(async (res, err) => {
    try {
      let modules = await Promise.all(
        pathway.modules.map((moduleId) => {
          return getSpecificModule(
            moduleId instanceof ObjectId ? moduleId : new ObjectId(moduleId),
            pathwaysDb
          );
        })
      );
      modules = modules.filter((x) => x !== null); // Remove all modules that weren't found
      res({
        name: pathway.name,
        _id: pathway._id,
        coverImage: pathway.coverImage,
        modules,
        tags: pathway.tags,
      });
    } catch (e) {
      err(e);
    }
  });
}

// Gets specific module given its id and database
export function getSpecificModule(
  moduleId: ObjectId,
  pathwaysDb: Db
): Promise<PathwayModule | null> {
  return new Promise(async (res, err) => {
    try {
      const [module, modulePersonalizedContent]: [
        PathwayModule_Db,
        PersonalizedContent[]
      ] = await Promise.all([
        pathwaysDb.collection("modules").findOne({
          _id: moduleId instanceof ObjectId ? moduleId : new ObjectId(moduleId),
        }) as Promise<PathwayModule_Db>,
        pathwaysDb
          .collection("personalized-content")
          .find({ moduleId: moduleId })
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      if (!module) {
        res(null);
      } else {
        res({
          _id: module._id,
          name: module.name,
          presetContent: module.presetContent,
          personalizedContent: modulePersonalizedContent,
          tags: module.tags,
        });
      }
    } catch (e) {
      err(e);
    }
  });
}
