import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async (req: NextApiRequest, resolve: NextApiResponse) => {
  // TODO: authentication, grab user id from token validation (probably)
  const { userToken, questionListId, questionList } = JSON.parse(req.body);

  if (questionList || questionListId) {
    try {
      const result = await putQuestionList(questionListId, questionList);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No question list data provided");
  }
};

// Admin API. Creates or updates a question list - if no ID provided, will
// create question list, otherwise will attempt to update given ID. If no
// question list provided, will attempt to delete
export const putQuestionList = (
  questionListId: ObjectId | undefined,
  questionList: QuestionList_Db | undefined
): Promise<void> => {
  if (questionList !== undefined && questionList._id) {
    // Document should not have _id field when sent to database
    delete questionList._id;
  }
  if (questionListId && !(questionListId instanceof ObjectId)) {
    questionListId = new ObjectId(questionListId);
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!questionListId && questionList) {
        await client
          .db("questions")
          .collection("question-lists")
          .insertOne(questionList);
      } else if (questionListId && !questionList) {
        await client
          .db("questions")
          .collection("question-lists")
          .deleteOne({ _id: questionListId });
      } else if (questionListId && questionList) {
        await client
          .db("questions")
          .collection("question-lists")
          .updateOne(
            { _id: questionListId },
            { $set: questionList },
            { upsert: true }
          );
      }
      res();
      client.close();
    } catch (e) {
      err(e);
    }
  });
};
