import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";
import { MONGO_CONNECTION_STRING } from "../../secrets";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, questionChunkId, questionChunk } = req.body;
  return questionChunk
    ? resolve
        .status(200)
        .send(await putQuestionChunk(questionChunkId, questionChunk))
    : resolve.status(400).send("No question chunk data provided");
};

// Admin API. Creates or updates a question chunk - if no ID provided, will
// create question chunk, otherwise will attempt to update given ID
export const putQuestionChunk = async (
  questionChunkId: string | undefined,
  questionChunk: Question
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          await client
            .db("questions")
            .collection("question-chunks")
            .updateOne(
              { _id: new ObjectId(questionChunkId) },
              { $set: questionChunk },
              { upsert: true }
            );
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
