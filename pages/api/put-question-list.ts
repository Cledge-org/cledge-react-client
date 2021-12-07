import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import assert from "assert";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, questionListId, questionList } = req.body;
  return questionList
    ? resolve
        .status(200)
        .send(await putQuestionList(questionListId, questionList))
    : resolve.status(400).send("No question chunk data provided");
};

// Admin API. Creates or updates a question list - if no ID provided, will
// create question list, otherwise will attempt to update given ID
export const putQuestionList = async (
  questionListId: string | undefined,
  questionList: Question
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          await client
            .db("questions")
            .collection("question-lists")
            .updateOne(
              { _id: questionListId },
              { $set: questionList },
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