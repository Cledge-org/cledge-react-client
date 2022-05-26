import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getSpecificModule,
  getSpecificPathway,
} from "src/pages/api/get-all-pathways";
import { getPathway } from "src/pages/api/get-pathway";
import { getQuestionListById } from "src/pages/api/get-question-list";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { userId } = JSON.parse(req.body);
  try {
    const allParts = await getDashboardParts(userId);
    resolve.status(200).send(allParts);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

// Admin API. Gets all pathways and their modules, with all their preset and
// personalized contents
export function getDashboardParts(userId: string): Promise<PathwayPart[]> {
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
          parts.map(({ _id }) => getSpecificFullPart(_id, userId))
        )) as PathwayPart[]
      );
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
export function getSpecificFullPart(
  partId: ObjectId,
  userId
): Promise<PathwayPart> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const pathwaysDb = client.db("pathways");
      const part: PathwayPart_Db = (await pathwaysDb
        .collection("parts")
        .findOne({
          _id: partId instanceof ObjectId ? partId : new ObjectId(partId),
        })) as PathwayPart_Db;
      let dynamicRoutes: DynamicPartRoute[] = await Promise.all(
        part.dynamicRoutes.map(async ({ type, routeId }) => ({
          type,
          route:
            type === "pathway"
              ? await getPathway(
                  userId,
                  routeId instanceof ObjectId ? routeId : new ObjectId(routeId)
                )
              : await getQuestionListById(routeId),
        }))
      );
      dynamicRoutes = dynamicRoutes.filter((x) => x !== null);
      res({
        name: part.name,
        _id: part._id,
        order: part.order,
        dynamicRoutes,
      });
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
