import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication
  const { userToken, contentId, content } = JSON.parse(req.body);

  if (content || contentId) {
    try {
      const result = await putPathwayModulePersonalizedContent(
        contentId,
        content
      );
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No pathway module data provided");
  }
};

// Admin API. Creates or updates personalized content for a pathway module. If a
// document ID for the content is provided, that document will be overriden. If
// no ID is provided, the content will be uploaded as a new document.
export const putPathwayModulePersonalizedContent = (
  contentId: ObjectId | undefined,
  content: PersonalizedContent | undefined
): Promise<ObjectId> => {
  if (content !== undefined && content._id) {
    // Document should not have _id field when sent to database
    delete content._id;
  }
  if (content && !(content.moduleId instanceof ObjectId)) {
    content.moduleId = new ObjectId(content.moduleId);
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(getEnvVariable("MONGO_URL"));
      try {
        if (!contentId && content) {
          let insertedDoc = await client
            .db("pathways")
            .collection("personalized-content")
            .insertOne(content);
          res(insertedDoc.insertedId);
        } else if (contentId && !content) {
          await client
            .db("pathways")
            .collection("personalized-content")
            .deleteOne({ _id: contentId });
          res(contentId);
        } else if (contentId && content) {
          await client
            .db("pathways")
            .collection("personalized-content")
            .updateOne({ _id: contentId }, { $set: content }, { upsert: true });
          res(contentId);
        }
        client.close();
      } catch (e) {
        err(e);
      }
    } catch (e) {
      err(e);
    }
  });
};
