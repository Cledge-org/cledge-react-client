import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, articleId, article } = JSON.parse(req.body);
  return article
    ? resolve
        .status(200)
        .send(
          await putResourceArticle(
            articleId ? new ObjectId(articleId) : undefined,
            article
          )
        )
    : resolve.status(400).send("No article provided");
};

// Admin API. Creates or updates a resource article - if no ID provided, will
// create article, otherwise will attempt to update given ID
export const putResourceArticle = async (
  articleId: ObjectId | undefined,
  article: CardArticle | undefined
): Promise<void> => {
  if (article._id) {
    // Document should not have _id field when sent to database
    delete article._id;
  }
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          if (!articleId && article) {
            await client
              .db("resources")
              .collection("articles")
              .insertOne(article);
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
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
