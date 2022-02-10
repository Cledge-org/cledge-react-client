import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(await getAllPathways());
};

// Admin API. Gets all pathways and their modules, with all their preset and
// personalized contents
export async function getAllPathways(): Promise<Pathway[]> {
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
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
      }
    );
  });
}

// Takes a pathway document and its database and populates its modules
export async function getSpecificPathway(
  pathway: Pathway_Db,
  pathwaysDb: Db
): Promise<Pathway> {
  return new Promise(async (res, err) => {
    let modules = await Promise.all(
      pathway.modules.map((moduleId) =>
        getSpecificModule(
          moduleId instanceof ObjectId ? moduleId : new ObjectId(moduleId),
          pathwaysDb
        )
      )
    );
    modules = modules.filter((x) => x !== null); // Remove all modules that weren't found
    res({
      title: pathway.title,
      _id: pathway._id,
      modules,
      tags: pathway.tags,
    });
  });
}

// Gets specific module given its id and database
async function getSpecificModule(
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
          _id: moduleId,
        }) as Promise<PathwayModule_Db>,
        pathwaysDb
          .collection("personalized-content")
          .find({ moduleId })
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      if (!module) {
        res(null);
      } else {
        res({
          _id: module._id,
          title: module.title,
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
