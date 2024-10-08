import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSpecificModule } from "src/pages/api/learning-pathway/get-all-pathways";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const allParts = await getAllParts();
    resolve.status(200).send(allParts);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Admin API. Gets all pathways and their modules, with all their preset and
// personalized contents
export function getAllParts(): Promise<PathwayPart_Db[]> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const pathwaysDb = client.db("pathways");
      const parts: PathwayPart_Db[] = (await pathwaysDb
        .collection("parts")
        .find()
        .toArray()) as PathwayPart_Db[];
      res(
        (await Promise.all(
          parts.map(({ _id }) => getSpecificPart(_id))
        )) as PathwayPart_Db[]
      );
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
export function getSpecificPart(partId: ObjectId): Promise<PathwayPart_Db> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const pathwaysDb = client.db("pathways");
      const part: PathwayPart_Db = (await pathwaysDb
        .collection("parts")
        .findOne({
          _id: partId instanceof ObjectId ? partId : new ObjectId(partId),
        })) as PathwayPart_Db;
      //!UNCOMMENT THE CODE BELOW IF YOU WANT THE PATHWAY/CHECKIN OBJECT AS WELL
      //   let dynamicRoutes: DynamicPartRoute[] = await Promise.all(
      //     part.dynamicRoutes.map(async ({ type, routeId }) => ({
      //       type,
      //       route:
      //         type === "pathway"
      //           ? await getSpecificPathwayById(
      //               routeId instanceof ObjectId ? routeId : new ObjectId(routeId)
      //             )
      //           : await getQuestionListById(routeId),
      //     }))
      //   );
      //   dynamicRoutes = dynamicRoutes.filter((x) => x !== null);
      res({
        name: part.name,
        _id: part._id,
        order: part.order,
        dynamicRoutes: part.dynamicRoutes,
      });
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
export function getSpecificPathwayById(pathwayId: ObjectId): Promise<Pathway> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const pathwaysDb = client.db("pathways");
      const pathway: Pathway_Db = (await pathwaysDb
        .collection("pathways")
        .findOne({
          _id:
            pathwayId instanceof ObjectId ? pathwayId : new ObjectId(pathwayId),
        })) as Pathway_Db;
      let modules: PathwayModule[] = await Promise.all(
        pathway.modules.map((moduleId) =>
          getSpecificModule(moduleId, pathwaysDb)
        )
      );
      modules = modules.filter((x) => x !== null);
      res({
        tags: pathway.tags,
        coverImage: pathway.coverImage,
        name: pathway.name,
        _id: pathway._id,
        modules,
      });
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
