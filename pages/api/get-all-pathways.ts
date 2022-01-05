import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../secrets";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(getAllPathways());
};

// Admin API. Gets all pathways and their modules, with all their preset and
// personalized contents
export async function getAllPathways(): Promise<Pathway[]> {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const courseDb = client.db("pathways");
        const pathways: Pathway_Db[] = (await courseDb
          .collection("pathways")
          .find()
          .toArray()) as Pathway_Db[];
        res(
          (await Promise.all(
            pathways.map((pathway: Pathway_Db) =>
              getSpecificPathway(pathway, courseDb)
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
  courseDb: Db
): Promise<Pathway> {
  return new Promise(async (res, err) => {
    const modules = await Promise.all(
      pathway.modules.map((moduleId) => getSpecificModule(moduleId, courseDb))
    );
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
  moduleId: string,
  courseDb: Db
): Promise<PathwayModule> {
  return new Promise(async (res, err) => {
    try {
      const [module, modulePersonalizedContent]: [
        PathwayModule_Db,
        PersonalizedContent[]
      ] = await Promise.all([
        courseDb.collection("modules").findOne({
          _id: new ObjectId(moduleId),
        }) as Promise<PathwayModule_Db>,
        courseDb
          .collection("personalized-content")
          .find({ moduleId })
          .toArray() as Promise<PersonalizedContent[]>,
      ]);
      res({
        _id: module._id,
        title: module.title,
        presetContent: module.presetContent,
        personalizedContent: modulePersonalizedContent,
        tags: module.tags,
      });
    } catch (e) {
      err(e);
    }
  });
}
