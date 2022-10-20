import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { article, articleId } = JSON.parse(req.body);

  if (article || articleId) {
    try {
      const result = await putBlogArticle(articleId, article);
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
  articleId: ObjectId | undefined,
  article: any
): Promise<void> => {
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
    try {
      if (articleId && !article) {
        await client
          .db("resources")
          .collection("articles")
          .deleteOne({ _id: articleId });
      } else if (articleId && article) {
        await client
          .db("resources")
          .collection("articles")
          .updateOne({ _id: articleId }, { $set: article }, { upsert: true });
      } else {
        await client.db("resources").collection("articles").insertOne(article);
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
