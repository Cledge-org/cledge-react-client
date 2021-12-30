import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../config";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, contentId, content } = JSON.parse(req.body);
  return content
    ? resolve
        .status(200)
        .send(await putPathwayModulePersonalizedContent(contentId, content))
    : resolve.status(400).send("No pathway module data provided");
};

// Admin API. Creates or updates personalized content for a pathway module. If a
// document ID for the content is provided, that document will be overriden. If
// no ID is provided, the content will be uploaded as a new document.
export const putPathwayModulePersonalizedContent = async (
  contentId: string | undefined,
  content: PersonalizedContent
): Promise<string> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          let updateResult = await client
            .db("pathways")
            .collection("personalized-content")
            .updateOne(
              { _id: new ObjectId(contentId) },
              { $set: content },
              { upsert: true }
            );
          res(updateResult.upsertedId.toString());
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
