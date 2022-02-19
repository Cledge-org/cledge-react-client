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
  const { userToken, questionChunkId, questionChunk } = JSON.parse(req.body);

  if (questionChunk) {
    try {
      const result = await putQuestionChunk(questionChunkId, questionChunk);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No question chunk data provided");
  }
};

// Admin API. Creates or updates a question chunk - if no ID provided, will
// create question chunk, otherwise will attempt to update given ID. If no
// question chunk is provided, will attempt to delete
export const putQuestionChunk = async (
  questionChunkId: ObjectId | undefined,
  questionChunk: QuestionChunk_Db | undefined
): Promise<{ chunkId: string }> => {
  if (questionChunk._id) {
    // Document should not have _id field when sent to database
    delete questionChunk._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!questionChunkId && questionChunk) {
        let insertedDoc = await client
          .db("questions")
          .collection("question-chunks")
          .insertOne(questionChunk);
        res({
          chunkId: insertedDoc.insertedId.toString(),
        });
      } else if (questionChunkId && !questionChunk) {
        await client
          .db("questions")
          .collection("question-chunks")
          .deleteOne({ _id: questionChunkId });
      } else if (questionChunkId && questionChunk) {
        await client
          .db("questions")
          .collection("question-chunks")
          .updateOne({ _id: questionChunkId }, { $set: questionChunk });
        res({
          chunkId: questionChunkId.toString(),
        });
      }
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
