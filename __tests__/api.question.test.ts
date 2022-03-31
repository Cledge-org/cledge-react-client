import { getAllQuestionLists } from "../pages/api/get-all-questions";
import { getQuestionList } from "../pages/api/get-question-list";
import { getQuestionProgress } from "../pages/api/get-question-progress";
import { getQuestionResponses } from "../pages/api/get-question-responses";
import { putQuestionChunk } from "../pages/api/put-question-chunk";
import { putQuestionList } from "../pages/api/put-question-list";
import { putQuestionResponses } from "../pages/api/put-question-responses";
import { putQuestion } from "../pages/api/put-question";
import { ObjectId } from "mongodb";

jest.setTimeout(1000000);

const testUserResponse: UserResponse = {
    questionId: "Test Question Id",
    response: "Test Response",
};

const questionId = "Test Question Id 2";
const testUserResponse2: UserResponse = {
    questionId: questionId,
    response: "Test Response 2",
};

const testUserProgress: UserProgress = {
    responses: [testUserResponse],
};

const testQuestion1: Question = {
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
    questions: [testQuestion1],
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

const question2ObjectId = new ObjectId();
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
    questions: [question2ObjectId],
};

const testProgressInfo: ProgressInfo = {
    userTags: ["Test User Tag 1", "Test User Tag 2", "Test User Tag 3"],
    userProgress: testUserProgress,
    questionData: [testQuestionList1],
};

const newObjectId = new ObjectId();

test("should add questions and get those added questions exactly", (done) => {
    async function callback() {
        // Test put functionality
        const question: Question[] = [testQuestion1];
        const userResponse: UserResponse[] = [testUserResponse];
        const questionList: QuestionList[] = [testQuestionList1];
        const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
        const gradeQuestionChunks: QuestionChunk[] = [testQuestionChunk1];
        const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];

        await Promise.all([
            ...questionListDb.map((questionList) => putQuestionList(undefined, questionList)),
        ]);
        await Promise.all([
            ...questionChunkDb.map((questionChunk) => putQuestionChunk(undefined, questionChunk)),
        ]);
        await Promise.all([
            ...question.map((questions) => putQuestion(question1ObjectId, questions)),
        ]);
        await Promise.all([
            ...userResponse.map((responses) => putQuestionResponses("Test User Id", [responses])),
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
        expect(fetchedQuestionsProgress.questionData.length).toBe(testProgressInfo.questionData.length);
        expect(fetchedQuestionResponse.length).toBe(userResponse.length);

        for (let i = 0; i < fetchedAllQuestionsLists.length; i++) {
            expect(fetchedAllQuestionsLists[i]).toMatchObject(questionList[i]);
        }
        for (let i = 0; i < fetchedQuestionList.chunks.length; i++) {
            expect(fetchedQuestionList.chunks[i]).toMatchObject(gradeQuestionChunks[i]);
        }
        for (let i = 0; i < fetchedQuestionsProgress.questionData.length; i++) {
            expect(fetchedQuestionsProgress.questionData[i]).toMatchObject(questionList[i]);
        }
        for (let i = 0; i < fetchedQuestionResponse.length; i++) {
            expect(fetchedQuestionResponse[i]).toMatchObject(userResponse[i]);
        }

        done();
    };
    callback();
});
 
test("verify questions given an ObjectId", (done) => {
    async function callback() {
        // Test put functionality given an ObjectId
        const question: Question[] = [testQuestion1];
        const userResponse: UserResponse[] = [testUserResponse];
        const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
        const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];

        await Promise.all([
            ...questionListDb.map((questionList) => putQuestionList(newObjectId, questionList)),
        ]);
        await Promise.all([
            ...questionChunkDb.map((questionChunk) => putQuestionChunk(newObjectId, questionChunk)),
        ]);
        await Promise.all([
            ...question.map((questions) => putQuestion(question1ObjectId, questions)),
        ]);
        await Promise.all([
            ...userResponse.map((responses) => putQuestionResponses("Test User Id", [responses])),
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
        for (let i = 0; i < actualResponses.length; i++) {
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

test("update question", (done) => {
    async function callback() {
        // Add the elements in the database
        const question: Question[] = [testQuestion1];
        const userResponse: UserResponse[] = [testUserResponse];
        const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
        const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];

        await Promise.all([
            ...questionListDb.map((questionList) => putQuestionList(newObjectId, questionList)),
        ]);
        await Promise.all([
            ...questionChunkDb.map((questionChunk) => putQuestionChunk(newObjectId, questionChunk)),
        ]);
        await Promise.all([
            ...question.map((questions) => putQuestion(question1ObjectId, questions)),
        ]);
        await Promise.all([
            ...userResponse.map((responses) => putQuestionResponses("Test User Id", [responses])),
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
            ...questionListDb2.map((questionList) => putQuestionList(newObjectId, questionList)),
        ]);
        await Promise.all([
            ...questionChunkDb2.map((questionChunk) => putQuestionChunk(newObjectId, questionChunk)),
        ]);
        await Promise.all([
            ...question2.map((questions) => putQuestion(question2ObjectId, questions)),
        ]);
        await Promise.all([
            ...userResponse2.map((responses) => putQuestionResponses("Test User Id 2", [responses])),
        ]);

        updateQuestion._id = newObjectId;
        updateUserResponse.questionId = questionId;
        updateQuestionListDb._id = newObjectId;
        updateQuestionChunkDb._id = newObjectId;

        let actualList = await getQuestionList(testQuestionListName2);
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

        for (let i = 0; i < actualResponses.length; i++) {
            if (actualResponses[i].questionId === updateUserResponse.questionId) {
                expect(actualResponses[i]).toEqual(updateUserResponse);
                responseCount++;
            }
        }

        expect(actualList).toMatchObject(testQuestionList2);

        const expectedCount = 1;
        expect(progressCount).toEqual(expectedCount);
        expect(responseCount).toEqual(expectedCount);

        done();
    };
    callback();
});


test("verify that questions are deleted so database is empty", (done) => {
    async function callback() {
        let [fetchedAllQuestionsLists1] = await Promise.all([getAllQuestionLists()]);

        let questionListIds1 = [];
        for (let i = 0; i < fetchedAllQuestionsLists1.length; i++) {
            questionListIds1.push(fetchedAllQuestionsLists1[i]._id);
        }

        for (let i = 0; i < questionListIds1.length; i++) {
            await Promise.all([
                putQuestionList(questionListIds1[i], undefined),
            ]);
        }
        [fetchedAllQuestionsLists1] = await Promise.all([getAllQuestionLists()]);
        expect(fetchedAllQuestionsLists1.length).toBe(0);
        done();
    };
    callback();
});

test("verify many questions", (done) => {
    async function callback() {
        const question: Question[] = [testQuestion1];
        const userResponse: UserResponse[] = [testUserResponse];
        const questionList: QuestionList[] = [testQuestionList1];
        const questionListDb: QuestionList_Db[] = [testQuestionListDb1];
        const gradeQuestionChunks: QuestionChunk[] = [testQuestionChunk1];
        const questionChunkDb: QuestionChunk_Db[] = [testQuestionChunkDb1];

        let manySizes = 10;
        let questionListIds = [];
        let questionChunkIds = [];
        let questionIds = [];
        let userIds = [];

        for (let i = 0; i < manySizes; i++) {
            let questionListObjectId = new ObjectId();
            questionListIds.push(questionListObjectId);
            let questionChunkObjectId = new ObjectId();
            questionChunkIds.push(questionChunkObjectId);
            let questionId = new ObjectId();
            questionIds.push(questionId);
            let userId = "Test User Id " + i;
            userIds.push(userId);

            await Promise.all([
                ...questionListDb.map((questionList) => putQuestionList(questionListObjectId, questionList)),
            ]);
            await Promise.all([
                ...questionChunkDb.map((questionChunk) => putQuestionChunk(questionChunkObjectId, questionChunk)),
            ]);
            await Promise.all([
                ...question.map((questions) => putQuestion(questionId, questions)),
            ]);
            await Promise.all([
                ...userResponse.map((responses) => putQuestionResponses(userId, [responses])),
            ]);
        }

        const [
            fetchedAllQuestionsLists,
            fetchedQuestionList,
            fetchedQuestionsProgress,
        ] = await Promise.all([
            getAllQuestionLists(),
            getQuestionList(testQuestionListName),
            getQuestionProgress(),
        ]);

        expect(fetchedAllQuestionsLists.length).toBe(manySizes);
        expect(fetchedQuestionList.chunks.length).toBe(testQuestionChunks.length);
        expect(fetchedQuestionsProgress.questionData.length).toBe(manySizes);

        for (let i = 0; i < fetchedAllQuestionsLists.length; i++) {
            expect(fetchedAllQuestionsLists[i]).toMatchObject(questionList[0]);
        }

        for (let i = 0; i < fetchedQuestionList.chunks.length; i++) {
            expect(fetchedQuestionList.chunks[i]).toMatchObject(gradeQuestionChunks[0]);
        }

        for (let i = 0; i < fetchedQuestionsProgress.questionData.length; i++) {
            expect(fetchedQuestionsProgress.questionData[i]).toMatchObject(
                questionList[0]
            );
        }
        
        for (let i = 0; i < userIds.length; i++) {
            const fetchedQuestionResponse = await getQuestionResponses(userIds[i]);
            expect(fetchedQuestionResponse.length).toBe(userResponse.length);
            for (let i = 0; i < fetchedQuestionResponse.length; i++) {
                expect(fetchedQuestionResponse[i]).toMatchObject(userResponse[0]);
            }
        }
        done();
    };
    callback();
});


