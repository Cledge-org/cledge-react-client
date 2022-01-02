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
  const { userToken, questionId, question } = req.body;
  return question
    ? resolve.status(200).send(await putQuestion(questionId, question))
    : resolve.status(400).send("No question data provided");
};

// Admin API. Creates or updates a question - if no ID provided, will create
// question, otherwise will attempt to update given ID
export const putQuestion = async (
  questionId: string | undefined,
  question: Question
): Promise<void> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          await client
            .db("questions")
            .collection("question-data")
            .updateOne(
              { _id: new ObjectId(questionId) },
              { $set: question },
              { upsert: true }
            );
          res();
        } catch (e) {
          console.log("ERROR: " + e)
          err(e);
        }
      }
    );
  });
};
