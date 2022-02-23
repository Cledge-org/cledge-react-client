import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, articleId, article } = JSON.parse(req.body);

  if (article) {
    try {
      const result = await putResourceArticle(articleId, article);
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
export const putResourceArticle = async (
  articleId: ObjectId | undefined,
  article: CardArticle | undefined
): Promise<void> => {
  if (article._id) {
    // Document should not have _id field when sent to database
    delete article._id;
  }
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      if (!articleId && article) {
        await client.db("resources").collection("articles").insertOne(article);
      } else if (articleId && !article) {
        await client
          .db("resources")
          .collection("articles")
          .deleteOne({ _id: articleId });
      } else if (articleId && article) {
        await client
          .db("resources")
          .collection("articles")
          .updateOne({ _id: articleId }, { $set: article });
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
