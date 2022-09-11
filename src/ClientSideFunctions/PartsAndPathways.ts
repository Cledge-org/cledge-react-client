import { MongoClient, ObjectId } from "mongodb";
import { getPathway } from "src/pages/api/user/get-pathway";
import { getQuestionListById } from "src/pages/api/questions/get-question-list";

export function getDashboardParts(userId: string):Promise<PathwayPart[]>{
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

  // Admin API. Gets all pathways and their modules, with all their preset and
// personalized contents


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
