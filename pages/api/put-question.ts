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
  const { userToken, questionId, question } = JSON.parse(req.body);

  if (question) {
    try {
      const result = await putQuestion(questionId, question);
      resolve.status(200).send(result);
    } catch (e) {
      resolve.status(500).send(e);
    }
  } else {
    resolve.status(400).send("No question data provided");
  }
};

// Admin API. Creates or updates a question - if no ID provided, will create
// question, otherwise will attempt to update given ID. If no question provided,
// will attempt to delete
export const putQuestion = async (
  questionId: ObjectId | undefined,
  question: Question | undefined
): Promise<{ questionId: string }> => {
  if (question._id) {
    // Document should not have _id field when sent to database
    delete question._id;
  }
  return new Promise(async (res, err) => {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      if (!questionId && question) {
        let insertedDoc = await client
          .db("questions")
          .collection("question-data")
          .insertOne(question);
        res({
          questionId: insertedDoc.insertedId.toString(),
        });
      } else if (questionId && !question) {
        await client
          .db("questions")
          .collection("question-data")
          .deleteOne({ _id: questionId });
        res({
          questionId: questionId.toString(),
        });
      } else if(questionId && question) {
        await client
          .db("questions")
          .collection("question-data")
          .updateOne({ _id: questionId }, { $set: question });
        res({
          questionId: questionId.toString(),
        });
      }
      client.close();
    } catch (e) {
      console.log("ERROR: " + e);
      err(e);
    }
  });
};
