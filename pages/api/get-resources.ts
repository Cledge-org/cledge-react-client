import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  return resolve.status(200).send(await getResourcesInfo());
};

export const getResourcesInfo = async (): Promise<ResourcesInfo> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        const resource_db = client.db("resources");
        const videoList: CardVideo[] = (
          await resource_db.collection("videos").find().toArray()
        ).map((x) => {
          return { source: x.source, title: x.title, _id: x._id };
        });
        const articles: CardArticle[] = (
          await resource_db.collection("articles").find().toArray()
        ).map((x) => {
          return {
            description: x.description,
            source: x.source,
            title: x.title,
            _id: x._id,
          };
        });
        const resources: CardResource[] = (
          await resource_db.collection("resources").find().toArray()
        ).map((x) => {
          return { source: x.source, title: x.title, _id: x._id };
        });
        res({ videoList, articles, resources });
      }
    );
  });
};
