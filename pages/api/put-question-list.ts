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
  const { userToken, questionListId, questionList } = JSON.parse(req.body);
  return questionList
    ? resolve
      .status(200)
      .send(
        await putQuestionList(
          questionListId,
          questionList
        )
      )
    : resolve.status(400).send("No question chunk data provided");
};

// Admin API. Creates or updates a question list - if no ID provided, will
// create question list, otherwise will attempt to update given ID
export const putQuestionList = async (
  questionListId: ObjectId | undefined,
  questionList: QuestionList_Db
): Promise<void> => {
  if (questionList._id) {
    // Document should not have _id field when sent to database
    delete questionList._id;
  }
  return new Promise((res, err) => {
    MongoClient.connect(
      process.env.MONGO_URL,
      async (connection_err, client) => {
        assert.equal(connection_err, null);
        try {
          if (!questionListId) {
            await client
              .db("questions")
              .collection("question-lists")
              .insertOne(questionList);
          } else {
            await client
              .db("questions")
              .collection("question-lists")
              .updateOne({ _id: questionListId }, { $set: questionList });
          }
          res();
        } catch (e) {
          err(e);
        }
      }
    );
  });
};
