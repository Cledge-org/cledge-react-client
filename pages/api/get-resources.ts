import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const resources = await getResourcesInfo();
    resolve.status(200).send(resources);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const getResourcesInfo = (): Promise<ResourcesInfo> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const resource_db = client.db("resources");
      const [videoList, articles, resources] = await Promise.all([
        resource_db.collection("all_resources").find({"category": "video"}).toArray() as Promise<
          CardVideo[]
        >,
        resource_db.collection("all_resources").find({"category": "article"}).toArray() as Promise<
          CardArticle[]
        >,
        resource_db.collection("all_resources").find({"category": "resource"}).toArray() as Promise<
          CardResource[]
        >,
      ]);
      videoList.forEach(function (currentValue) {
        delete currentValue.category;
      });
      articles.forEach(function (currentValue) {
        delete currentValue.category;
      });
      resources.forEach(function (currentValue) {
        delete currentValue.category;
      });
      res({ videoList, articles, resources });
      client.close();
    } catch (e) {
      err(res);
    }
  });
};
