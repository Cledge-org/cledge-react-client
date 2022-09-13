import { Db, MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  try {
    const allPosts = await getRecentBlogs();
    resolve.status(200).send(allPosts);
  } catch (e) {
    resolve.status(500).send(e);
  }
};

export const getRecentBlogs = (): Promise<any> => {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const resource_db = client.db("resources");
      const articles = await Promise.all([
        resource_db
          .collection("articles")
          .find()
          .sort({ _id: -1 })
          .limit(10)
          .toArray() as Promise<any[]>,
      ]);
      res({ articles });
      client.close();
    } catch (e) {
      err(res);
    }
  });
};
