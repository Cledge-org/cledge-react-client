import { getAllQuestionLists } from "../pages/api/get-all-questions";
import { getQuestionList } from "../pages/api/get-question-list";
import { getQuestionProgress } from "../pages/api/get-question-progress";
import { getQuestionResponses } from "../pages/api/get-question-responses";
import { putQuestionChunk } from "../pages/api/put-question-chunk";
import { putQuestionList } from "../pages/api/put-question-list";
import { putQuestionResponses } from "../pages/api/put-question-responses";
import { putQuestion } from "../pages/api/put-question";
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

test("should add questions and get those added questions exactly", (done) => {
  const callback = async () => {
    // Test put functionality
    const question: Question[] = [testQuestion];
    const userResponse: UserResponse[] = [testUserResponse];
    const questionList: QuestionList[] = [testQuestionList1];
    const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
    const gradeQuestionChunks: QuestionChunk[] = [testQuestionChunk1];
    const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];

    await Promise.all([
      ...questionListDb.map((questionList) =>
        putQuestionList(undefined, questionList)
      ),
    ]);
    await Promise.all([
      ...questionChunkDb.map((questionChunk) =>
        putQuestionChunk(undefined, questionChunk)
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

    // Test get functionality - should be identical to what we put
    const [
      fetchedAllQuestionsLists,
      fetchedQuestionList,
      fetchedQuestionsProgress,
      fetchedQuestionResponse,
    ] = await Promise.all([
      getAllQuestionLists(),
      getQuestionList(testQuestionListName),
      getQuestionProgress(),
      getQuestionResponses("Test User Id"),
    ]);

    expect(fetchedAllQuestionsLists.length).toBe(questionListDb.length);
    expect(fetchedQuestionList.chunks.length).toBe(testQuestionChunks.length);
    expect(fetchedQuestionsProgress.questionData.length).toBe(
      testProgressInfo.questionData.length
    );
    expect(fetchedQuestionResponse.length).toBe(userResponse.length);

    for (let i = 0; i < fetchedAllQuestionsLists.length; i++) {
      expect(fetchedAllQuestionsLists[i]).toMatchObject(questionList[i]);
    }
    for (let i = 0; i < fetchedQuestionList.chunks.length; i++) {
      expect(fetchedQuestionList.chunks[i]).toMatchObject(
        gradeQuestionChunks[i]
      );
    }
    for (let i = 0; i < fetchedQuestionsProgress.questionData.length; i++) {
      expect(fetchedQuestionsProgress.questionData[i]).toMatchObject(
        questionList[i]
      );
    }
    for (let i = 0; i < fetchedQuestionResponse.length; i++) {
      expect(fetchedQuestionResponse[i]).toMatchObject(userResponse[i]);
    }
    done();
  };
  callback();
});
