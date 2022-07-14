import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { article } = JSON.parse(req.body);
  console.log(111);

  if (article) {
    try {
      const result = await putBlogArticle(article);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No article provided");
  }
};

// Admin API. Creates or updates a resource article - if no ID provided, will
// create article, otherwise will attempt to update given ID. If no article
// provided, will attempt to delete
export const putBlogArticle = async (
  article: ObjectId | undefined
): Promise<void> => {
  console.log(222);
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      await client.db("resources").collection("articles").insertOne(article);
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
