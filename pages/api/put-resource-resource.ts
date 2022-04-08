import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, resourceId, resource } = JSON.parse(req.body);

  if (resource) {
    try {
      const result = await putResourceResource(resourceId, resource);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No resource provided");
  }
};

// Admin API. Creates or updates a resource - if no ID provided, will create
// resource, otherwise will attempt to update given ID. If no resource provided,
// will attempt to delete.
export const putResourceResource = async (
  resourceId: ObjectId | undefined,
  resource: CardResource | undefined
): Promise<void> => {
  if (resource !== undefined && resource._id) {
    // Document should not have _id field when sent to database
    delete resource._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!resourceId && resource) {
        await client
          .db("resources")
          .collection("all_resources")
          .insertOne(resource);
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
