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
  return resource
    ? resolve
        .status(200)
        .send(
          await putResourceResource(
            resourceId ? new ObjectId(resourceId) : undefined,
            resource
          )
        )
    : resolve.status(400).send("No video provided");
};

// Admin API. Creates or updates a resource - if no ID provided, will create
// resource, otherwise will attempt to update given ID
export const putResourceResource = async (
  resourceId: ObjectId | undefined,
  resource: CardResource
): Promise<void> => {
  if (resource._id) {
    // Document should not have _id field when sent to database
    delete resource._id;
  }
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          if (!resourceId) {
            await client
              .db("resources")
              .collection("resources")
              .insertOne(resource);
          } else {
            await client
              .db("resources")
              .collection("resources")
              .updateOne({ _id: resourceId }, { $set: resource });
          }
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
