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


test("verify questions", (done) => {
    async function callback() {
        const question: Question[] = [testQuestion];
        const userResponse: UserResponse[] = [testUserResponse];
        const questionList: QuestionList[] = [testQuestionList1];
        const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
        const gradeQuestionChunks: QuestionChunk[] = [testQuestionChunk1];
        const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];

        let manySizes = 10;
        let objectIds = [];

        for (let i = 0; i < manySizes; i++) {
            let newObjectId = new ObjectId();
            objectIds.push(newObjectId);
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
        }

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

        expect(fetchedAllQuestionsLists.length).toBe(manySizes);
        expect(fetchedQuestionList.chunks.length).toBe(testQuestionChunks.length);
        expect(fetchedQuestionsProgress.questionData.length).toBe(manySizes);
        expect(fetchedQuestionResponse.length).toBe(userResponse.length);

        for (let i = 0; i < fetchedAllQuestionsLists.length; i++) {
            expect(fetchedAllQuestionsLists[i]).toMatchObject(questionList[0]);
        }
        for (let i = 0; i < fetchedQuestionList.chunks.length; i++) {
            expect(fetchedQuestionList.chunks[i]).toMatchObject(
                gradeQuestionChunks[0]
            );
        }
        for (let i = 0; i < fetchedQuestionsProgress.questionData.length; i++) {
            expect(fetchedQuestionsProgress.questionData[i]).toMatchObject(
                questionList[0]
            );
        }
        for (let i = 0; i < fetchedQuestionResponse.length; i++) {
            expect(fetchedQuestionResponse[i]).toMatchObject(userResponse[0]);
        }
        done();
    };
    callback();
});


