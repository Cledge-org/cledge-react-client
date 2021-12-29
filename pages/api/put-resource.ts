import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  const { type, resource, resourceId } = JSON.parse(req.body);
  return !type || !resource || !resourceId
    ? resolve.status(400).send("Information missing")
    : resolve.status(200).send(await putResource(type, resource, resourceId));
};

export const putResource = async (
  type: string,
  resource: CardVideo | CardArticle | CardResource,
  resourceId: string
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const resource_db = client.db("resources");
        try {
          await resource_db
            .collection(type)
            .updateOne(
              { _id: new ObjectId(resourceId) },
              { $set: resource },
              { upsert: true }
            );
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
