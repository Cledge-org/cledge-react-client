import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

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
// resource, otherwise will attempt to update given ID
export const putResourceResource = async (
  resourceId: ObjectId | undefined,
  resource: CardResource | undefined
): Promise<void> => {
  if (resource._id) {
    // Document should not have _id field when sent to database
    delete resource._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!resourceId && resource) {
        await client
          .db("resources")
          .collection("resources")
          .insertOne(resource);
      } else if (resourceId && !resource) {
        await client
          .db("resources")
          .collection("resources")
          .deleteOne({ _id: resourceId });
      } else if (resourceId && resource) {
        await client
          .db("resources")
          .collection("resources")
          .updateOne({ _id: resourceId }, { $set: resource });
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
