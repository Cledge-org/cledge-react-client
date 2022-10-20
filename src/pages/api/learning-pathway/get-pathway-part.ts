import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getPathway } from "src/pages/api/learning-pathway/get-pathway";
import { getQuestionListById } from "src/pages/api/questions/get-question-list";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, partId } = JSON.parse(req.body);

  if (userId && partId) {
    try {
      const part = await getPart(userId, partId);
      resolve.status(200).send(part);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

// Gets all the part modules and content for a part ID and specific user (firebaseId)
export function getPart(
  userId: string,
  partId: ObjectId
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
        part.dynamicRoutes.map(({ type, routeId }) => ({
          type,
          route:
            type === "pathway"
              ? getPathway(userId, routeId)
              : getQuestionListById(routeId),
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
