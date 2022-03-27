import BSON from "bson";
import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
    // TODO: authentication, grab user id from token validation (probably)
    const { userToken, resourceId, resource, tag } = req.body;

    // use this line only if resourceId is not an ObjectId type;
    // change line 27 resourceId into resourceObId
    // const resourceObjId = new BSON.ObjectId(resourceId);
    const types = ["video", "article", "resource"];
    if (!resourceId) {
      if (!(tag && types.includes(tag))) {
        resolve.status(400).send("Invalid resource type");
        return;
      }
    }
    try {
        const result = await putResource(resourceId, resource, tag);
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
  resource: CardArticle | CardVideo | CardResource | undefined,
  tag: String | undefined
): Promise<void> => {
  if (resource) {
    resource.tag = tag;
    resource.description = resource.description ? resource.description : "";
    if (resource._id) {
      // Document should not have _id field when sent to database
      delete resource._id;
    }

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
          .updateOne({ _id: resourceId }, { $set: resource }, {upsert: true});
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};