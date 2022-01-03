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
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, questionId, question } = JSON.parse(req.body);
  return question
    ? resolve.status(200).send(await putQuestion(questionId, question))
    : resolve.status(400).send("No question data provided");
};

// Admin API. Creates or updates a question - if no ID provided, will create
// question, otherwise will attempt to update given ID
export const putQuestion = async (
  questionId: string,
  question: Question
): Promise<{ questionId: string }> => {
  return new Promise((res, err) => {
    MongoClient.connect(
      MONGO_CONNECTION_STRING,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          let updateResult = await client
            .db("questions")
            .collection("question-data")
            .updateOne(
              { _id: new ObjectId(questionId) },
              { $set: question },
              { upsert: true }
            );
          let questionObjectId =
            updateResult.upsertedId === null
              ? questionId
              : updateResult.upsertedId.toString();
          res({
            questionId: questionObjectId,
          });
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
