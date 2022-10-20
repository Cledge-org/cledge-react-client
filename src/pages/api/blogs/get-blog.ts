import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, userId, slug } = JSON.parse(req.body);

  if (slug) {
    try {
      const post = await getPost(slug);
      resolve.status(200).send(post);
    } catch (e) {
      resolve.status(500).send(e);
    }
  }
};

export function getPost(slug: string): Promise<any> {
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
      const resourcesDb = client.db("resources");
      const [post]: [any] = await Promise.all([
        resourcesDb.collection("articles").findOne({
          _slug: slug,
        }) as Promise<any>,
      ]);
      res({
        title: post.title,
        _slug: slug,
        author: post.author,
        date: post.date,
        description: post.description,
        content: post.content,
        topics: post.topics,
        image: post.image,
        keywords: post.keywords,
      });
      client.close();
    } catch (e) {
      err(e);
    }
  });
}
