import { getAllQuestionLists } from "../pages/api/get-all-questions";
import { getQuestionList } from "../pages/api/get-question-list";
import { getQuestionProgress } from "../pages/api/get-question-progress";
import { getQuestionResponses } from "../pages/api/get-question-responses";
import { putQuestionChunk } from "../pages/api/put-question-chunk";
import { putQuestionList } from "../pages/api/put-question-list";
import { putQuestionResponses } from "../pages/api/put-question-responses";
import { putQuestion } from "../pages/api/put-question";
import { ObjectId } from "mongodb";

const questionId = "Test Question Id 2";
const testUserResponse: UserResponse = {
  questionId: "Test Question Id",
  response: "Test Response",
};

const testUserResponse2: UserResponse = {
    questionId: questionId,
    response: "Test Response 2",
};

const testUserProgress: UserProgress = {
  responses: [testUserResponse],
};

const testQuestion: Question = {
  question: "Test Question",
  type: "Test Type",
};

const testQuestion2: Question = {
    question: "Test Question 2",
    type: "Test Type 2",
};

const testQuestionChunkName = "Test Chunk 1";
const testQuestionChunk1: QuestionChunk = {
  _id: new ObjectId(),
  name: testQuestionChunkName,
  questions: [testQuestion],
};

const testQuestionChunkName2 = "Test Chunk 2";
const testQuestionChunk2: QuestionChunk = {
  _id: new ObjectId(),
  name: testQuestionChunkName2,
  questions: [testQuestion2],
};

const testQuestionChunks = [testQuestionChunk1];
const testQuestionListName = "Test Question List Name";
const testQuestionList1: QuestionList = {
  _id: new ObjectId(),
  name: testQuestionListName,
  chunks: testQuestionChunks,
};

const testQuestionChunks2 = [testQuestionChunk2];
const testQuestionListName2 = "Test Question List Name 2";
const testQuestionList2: QuestionList = {
  _id: new ObjectId(),
  name: testQuestionListName2,
  chunks: testQuestionChunks2,
};

const question1ObjectId = new ObjectId();
const testQuestionListDb1: QuestionList_Db = {
  _id: new ObjectId(),
  name: testQuestionListName,
  chunks: [testQuestionChunkName],
};

const testQuestionListDb2: QuestionList_Db = {
    _id: new ObjectId(),
    name: testQuestionListName2,
    chunks: [testQuestionChunkName2],
};

const testQuestionChunkDb1: QuestionChunk_Db = {
  _id: new ObjectId(),
  name: testQuestionChunkName,
  questions: [question1ObjectId],
};

const testQuestionChunkDb2: QuestionChunk_Db = {
    _id: new ObjectId(),
    name: testQuestionChunkName2,
    questions: [question1ObjectId],
  };

const testProgressInfo: ProgressInfo = {
  userTags: ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"],
  userProgress: testUserProgress,
  questionData: [testQuestionList1],
};

const newObjectId = new ObjectId();

test ("update question", async () => {
    // Add the elements in the database
    const question: Question[] = [testQuestion];
    const userResponse: UserResponse[] = [testUserResponse];
    const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
    const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];

    await Promise.all([
        ...questionListDb.map((questionList) =>
          putQuestionList(newObjectId, questionList)),
    ]);
    await Promise.all([
        ...questionChunkDb.map((questionChunk) =>
          putQuestionChunk(newObjectId, questionChunk)),
    ]);
    await Promise.all([
        ...question.map((questions) => putQuestion(question1ObjectId, questions)),
    ]);
    await Promise.all([
        ...userResponse.map((responses) =>
          putQuestionResponses("Test User Id", [responses])),
    ]);

    // Update the elements in the database
    let updateQuestion = testQuestion2;
    let updateUserResponse = testUserResponse2;
    let updateQuestionListDb = testQuestionListDb2;
    let updateQuestionChunkDb = testQuestionChunkDb2;

    const question2: Question[] = [testQuestion2];
    const userResponse2: UserResponse[] = [testUserResponse2];
    const questionListDb2: QuestionList_Db[] = [testQuestionListDb2];
    const questionChunkDb2: QuestionChunk_Db[] = [testQuestionChunkDb2];
    
    await Promise.all([
        ...questionListDb2.map((questionList) =>
          putQuestionList(newObjectId, questionList)),
    ]);
    await Promise.all([
        ...questionChunkDb2.map((questionChunk) =>
          putQuestionChunk(newObjectId, questionChunk)),
    ]);
    await Promise.all([
        ...question2.map((questions) =>
         putQuestion(question1ObjectId, questions)),
    ]);
    await Promise.all([
        ...userResponse2.map((responses) =>
          putQuestionResponses("Test User Id 2", [responses])),
    ]);

    updateQuestion._id = newObjectId;
    updateUserResponse.questionId = questionId;
    updateQuestionListDb._id = newObjectId;
    updateQuestionChunkDb._id = newObjectId;

    let actualList = await getQuestionList(testQuestionListName);
    let actualProgress = await getQuestionProgress();
    let actualProgressData = actualProgress["questionData"];
    let actualResponses = await getQuestionResponses("Test User Id 2");

    let progressCount = 0;
    let responseCount = 0;

    for (let i = 0; i < actualProgressData.length; i++) {
      if (actualProgressData[i]._id.equals(newObjectId)) {
        expect(actualProgressData[i]).toMatchObject(testQuestionList2)
        progressCount++;
      }
    }

    for (let i = 0; i< actualResponses.length; i++) {
      if (actualResponses[i].questionId == "Test User Id 2") {
        expect(actualResponses[i]).toEqual(updateUserResponse);
        responseCount++;
      }
    }

    expect(actualList).toMatchObject(testQuestionList1);

    const expectedCount = 1;
    expect(progressCount).toEqual(expectedCount);
    expect(responseCount).toEqual(expectedCount);
});