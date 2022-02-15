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
      const videoList: CardVideo[] = (await resource_db
        .collection("videos")
        .find()
        .toArray()) as CardVideo[];
      const articles: CardArticle[] = (await resource_db
        .collection("articles")
        .find()
        .toArray()) as CardArticle[];
      const resources: CardResource[] = (await resource_db
        .collection("resources")
        .find()
        .toArray()) as CardResource[];
      res({ videoList, articles, resources });
      client.close();
    } catch (e) {
      err(res);
    }
  });
};
