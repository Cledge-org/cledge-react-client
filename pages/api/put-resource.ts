import BSON from "bson";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { CardResource } from "../../types";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    // TODO: authentication, grab user id from token validation (probably)
    const { userToken, resourceId, resource } = req.body;

    // use this line only if resourceId is not an ObjectId type;
    // change line 21 resourceId into resourceIdStr
    const resourceObjId = new BSON.ObjectId(resourceId);
    try {
        const result = await putResource(resourceObjId, resource);
        resolve.status(200).send(result);
    } catch (e) {
        resolve.status(500).send(e);
    }
};

// Admin API. Creates or updates a resource article - if no ID provided, will
// create article, otherwise will attempt to update given ID. If no article
// provided, will attempt to delete
export const putResource = async (
  resourceId: ObjectId | undefined,
  resource: CardResource | undefined
): Promise<void> => {
  if (resource && resource._id) {
    // Document should not have _id field when sent to database
    delete resource._id;
  }
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      if (!resourceId && resource) {
        await client.db("resources").collection("all_resources").insertOne(resource);
      } else if (resourceId && !resource) {
        await client
          .db("resources")
          .collection("all_resources")
          .deleteOne({ _id: resourceId });
      } else if (resourceId && resource) {
        await client
          .db("resources")
          .collection("all_resources")
          .updateOne({ _id: resourceId }, { $set: resource });
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
