import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, articleId, article } = req.body;
  console.log(111);

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
  if (article !== undefined && article._id) {
    // Document should not have _id field when sent to database
    delete article._id;
  }
  console.log(222);
  return new Promise(async (res, err) => {
    const client = await MongoClient.connect(process.env.MONGO_URL);
    try {
      if (!articleId && article) {
        article.tag = "article";
        await client.db("resources").collection("all_resources").insertOne(article);
      } else if (articleId && !article) {
        await client
          .db("resources")
          .collection("all_resources")
          .deleteOne({ _id: articleId });
      } else if (articleId && article) {
        await client
          .db("resources")
          .collection("all_resources")
          .updateOne({ _id: articleId }, { $set: article }, {upsert: true});
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
