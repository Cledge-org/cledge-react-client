import { getAllQuestionLists } from "../../pages/api/get-all-questions";
import { getQuestionList } from "../../pages/api/get-question-list";
import { getQuestionProgress } from "../../pages/api/get-question-progress";
import { getQuestionResponses } from "../../pages/api/get-question-responses";
import { putQuestionChunk } from "../../pages/api/put-question-chunk";
import { putQuestionList } from "../../pages/api/put-question-list";
import { putQuestionResponses } from "../../pages/api/put-question-responses";
import { putQuestion } from "../../pages/api/put-question";
import { ObjectId } from "mongodb";

const testUserResponse: UserResponse = {
  questionId: "Test Question Id",
  response: "Test Response",
};

const testUserProgress: UserProgress = {
  responses: [testUserResponse],
};

const testQuestion: Question = {
  question: "Test Question",
  type: "Test Type",
};

const testQuestionChunkName = "Test Chunk 1";
const testQuestionChunk1: QuestionChunk = {
  _id: new ObjectId(),
  name: testQuestionChunkName,
  questions: [testQuestion],
};

const testQuestionChunks = [testQuestionChunk1];
const testQuestionListName = "Test Question List Name";
const testQuestionList1: QuestionList = {
  _id: new ObjectId(),
  name: testQuestionListName,
  chunks: testQuestionChunks,
};

const question1ObjectId = new ObjectId();
const testQuestionListDb1: QuestionList_Db = {
  _id: new ObjectId(),
  name: testQuestionListName,
  chunks: [testQuestionChunkName],
};

const testQuestionChunkDb1: QuestionChunk_Db = {
  _id: new ObjectId(),
  name: testQuestionChunkName,
  questions: [question1ObjectId],
};

const testProgressInfo: ProgressInfo = {
  userTags: ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"],
  userProgress: testUserProgress,
  questionData: [testQuestionList1],
};

const newObjectId = new ObjectId();

test ("verify questions", (done) => {
  async function callback() {
  const question: Question[] = [testQuestion];
  const userResponse: UserResponse[] = [testUserResponse];
  const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
  const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];
 
  await Promise.all([
    ...questionListDb.map((questionList) =>
      putQuestionList(newObjectId, questionList)
    ),
  ]);
  await Promise.all([
    ...questionChunkDb.map((questionChunk) =>
      putQuestionChunk(newObjectId, questionChunk)
    ),
  ]);
  await Promise.all([
    ...question.map((questions) => putQuestion(question1ObjectId, questions)),
  ]);
  await Promise.all([
    ...userResponse.map((responses) =>
      putQuestionResponses("Test User Id", [responses])
    ),
  ]);

    let actualList = await getQuestionList(testQuestionListName);
    let actualProgress = await getQuestionProgress();
    let actualProgressData = actualProgress["questionData"];
    let actualResponses = await getQuestionResponses("Test User Id");

    let progressCount = 0;
    for (let i = 0; i < actualProgressData.length; i++) {
      if (actualProgressData[i]._id.equals(newObjectId)) {
          progressCount++;
      }
    }

    let responseCount = 0;
    for (let i = 0; i< actualResponses.length; i++) {
      if (actualResponses[i].questionId == testUserResponse.questionId)
        responseCount++;
    }

    expect(actualList).toMatchObject(testQuestionList1);

    expect(progressCount).toEqual(1);
    expect(responseCount).toEqual(1);

    done();
  };
  callback();
});

