import { getAllQuestionLists } from "../pages/api/get-all-questions";
import { getQuestionList } from "../pages/api/get-question-list";
import { getQuestionProgress } from "../pages/api/get-question-progress";
import { getQuestionResponses } from "../pages/api/get-question-responses";
import { putQuestionChunk } from "../pages/api/put-question-chunk";
import { putQuestionList } from "../pages/api/put-question-list";
import { putQuestionResponses } from "../pages/api/put-question-responses";
import { putQuestion } from "../pages/api/put-question";
import { MongoClient, ObjectId } from "mongodb";

const testUserResponse: UserResponse = {
    questionId: "Test Question Id",
    response: "Test Response",
};

const questionId = "Test Question Id 2";
const testUserResponse2: UserResponse = {
    questionId: questionId,
    response: "Test Response 2",
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

const question1ObjectId = new ObjectId();
const testQuestionChunkDb1: QuestionChunk_Db = {
    _id: new ObjectId(),
    name: testQuestionChunkName,
    questions: [question1ObjectId],
};

const question2ObjectId = new ObjectId();
const testQuestionChunkDb2: QuestionChunk_Db = {
    _id: new ObjectId(),
    name: testQuestionChunkName2,
    questions: [question2ObjectId],
};

const questionObjectId = new ObjectId();

beforeEach(async () => {
    // Clear relevant databases
    const client = await MongoClient.connect(process.env.MONGO_URL);
    for (let connection of await client.db("questions").collections()) {
        await connection.deleteMany({});
    }

    for (let connection of await client.db("users").collections()) {
        await connection.deleteMany({});
    }
    
    await client.close();
});


test("should add one question and get that one added question exactly", (done) => {
    async function callback() {
        // Test put functionality
        const question: Question = testQuestion1;
        const userResponse: UserResponse = testUserResponse;
        const questionList: QuestionList = testQuestionList1;
        const questionListDb: QuestionList_Db = testQuestionListDb1;
        const gradeQuestionChunks: QuestionChunk = testQuestionChunk1;
        const questionChunkDb: QuestionChunk_Db = testQuestionChunkDb1;
        const userId: string = "Test User Id";

        await putQuestionList(undefined, questionListDb);
        await putQuestionChunk(undefined, questionChunkDb);
        await putQuestion(question1ObjectId, question);
        await putQuestionResponses(userId, [userResponse]);

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
            getQuestionResponses(userId),
        ]);

        expect(fetchedAllQuestionsLists.length).toBe(1);
        expect(fetchedQuestionList.chunks.length).toBe(1);
        expect(fetchedQuestionsProgress.questionData.length).toBe(1);
        expect(fetchedQuestionResponse.length).toBe(1);

        expect(fetchedAllQuestionsLists[0]).toMatchObject(questionList);
        expect(fetchedQuestionList.chunks[0]).toMatchObject(gradeQuestionChunks);
        expect(fetchedQuestionsProgress.questionData[0]).toMatchObject(questionList);
        expect(fetchedQuestionResponse[0]).toMatchObject(userResponse);

        done();
    };
    callback();
});

test("verify questions given an ObjectId", (done) => {
    async function callback() {
        // Test put functionality given an ObjectId
        const question: Question = testQuestion1;
        const userResponse: UserResponse = testUserResponse;
        const questionListDb: QuestionList_Db = testQuestionListDb1;
        const questionChunkDb: QuestionChunk_Db = testQuestionChunkDb1;

        await putQuestionList(questionObjectId, questionListDb);
        await putQuestionChunk(questionObjectId, questionChunkDb);
        await putQuestion(question1ObjectId, question);
        await putQuestionResponses("Test User Id", [userResponse]);


        let actualList = await getQuestionList(testQuestionListName);
        let actualProgress = await getQuestionProgress();
        let actualProgressData = actualProgress["questionData"];
        let actualResponses = await getQuestionResponses("Test User Id");

        expect(actualList).toMatchObject(testQuestionList1);
        expect(actualProgressData.length).toBe(1);
        expect(actualResponses.length).toBe(1);


        let progressCount = false;
        if (actualProgressData[0]._id.equals(questionObjectId)) {
            progressCount = true;
        }

        let responseCount = false;
        if (actualResponses[0].questionId == testUserResponse.questionId) {
            responseCount = true;
        }


        expect(progressCount).toEqual(true);
        expect(responseCount).toEqual(true);

        done();
    };
    callback();
});

test("update question", (done) => {
    async function callback() {
        // Add the elements in the database
        const question: Question = testQuestion1;
        const userResponse: UserResponse = testUserResponse;
        const questionListDb: QuestionList_Db = testQuestionListDb1;
        const questionChunkDb: QuestionChunk_Db = testQuestionChunkDb1;

        await putQuestionList(questionObjectId, questionListDb);
        await putQuestionChunk(questionObjectId, questionChunkDb);
        await putQuestion(question1ObjectId, question);
        await putQuestionResponses("Test User Id", [userResponse]);

        // Update the elements in the database
        let updateQuestion = testQuestion2;
        let updateUserResponse = testUserResponse2;
        let updateQuestionListDb = testQuestionListDb2;
        let updateQuestionChunkDb = testQuestionChunkDb2;

        const question2: Question = testQuestion2;
        const userResponse2: UserResponse = testUserResponse2;
        const questionListDb2: QuestionList_Db = testQuestionListDb2;
        const questionChunkDb2: QuestionChunk_Db = testQuestionChunkDb2;

        await putQuestionList(questionObjectId, questionListDb2);
        await putQuestionChunk(questionObjectId, questionChunkDb2);
        await putQuestion(question2ObjectId, question2);
        await putQuestionResponses("Test User Id 2", [userResponse2]);

        updateQuestion._id = questionObjectId;
        updateUserResponse.questionId = questionId;
        updateQuestionListDb._id = questionObjectId;
        updateQuestionChunkDb._id = questionObjectId;

        let actualList = await getQuestionList(testQuestionListName2);
        let actualProgress = await getQuestionProgress();
        let actualProgressData = actualProgress["questionData"];
        let actualResponses = await getQuestionResponses("Test User Id 2");

        expect(actualList).toMatchObject(testQuestionList2);
        expect(actualProgressData.length).toBe(1);
        expect(actualResponses.length).toBe(1);

        let progressCount = false;
        if (actualProgressData[0]._id.equals(questionObjectId)) {
            expect(actualProgressData[0]).toMatchObject(testQuestionList2)
            progressCount = true;
        }

        let responseCount = false;

        if (actualResponses[0].questionId === updateUserResponse.questionId) {
            expect(actualResponses[0]).toEqual(updateUserResponse);
            responseCount = true;
        }

        expect(actualList).toMatchObject(testQuestionList2);
        expect(progressCount).toEqual(true);
        expect(responseCount).toEqual(true);

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
    function createQuestion(i: string, questionId: ObjectId): {
        userResponse: UserResponse, question: Question, questionChunk: QuestionChunk,
        questionList: QuestionList, questionListDb: QuestionList_Db, questionChunkDb: QuestionChunk_Db
    } {
        const userResponse: UserResponse = {
            questionId: "Test Question Id " + i,
            response: "Test Response " + i,
        };

        const question: Question = {
            question: "Test Question " + i,
            type: "Test Type " + i,
        };

        const questionChunkName = "Test Chunk " + i;
        const questionChunk: QuestionChunk = {
            _id: new ObjectId(),
            name: questionChunkName,
            questions: [question],
        };

        const questionChunks = [questionChunk];
        const questionListName = "Test Question List Name " + i;
        const questionList: QuestionList = {
            _id: new ObjectId(),
            name: questionListName,
            chunks: questionChunks,
        };

        const questionListDb: QuestionList_Db = {
            _id: new ObjectId(),
            name: questionListName,
            chunks: [questionChunkName],
        };

        const questionChunkDb: QuestionChunk_Db = {
            _id: new ObjectId(),
            name: questionChunkName,
            questions: [questionId],
        };

        return {
            userResponse: userResponse, question: question, questionChunk: questionChunk,
            questionList: questionList, questionListDb: questionListDb, questionChunkDb: questionChunkDb
        };
    }

    async function callback() {
        let manySizes = 3;
        let questionListIds = [];
        let questionChunkIds = [];
        let questionIds = [];
        let userIds = [];
        let questionList: QuestionList[] = [];
        let gradeQuestionChunks: QuestionChunk[] = [];
        let userResponses: UserResponse[] = []
        let questionListNames: string[] = [];

        for (let i = 0; i < manySizes; i++) {
            let questionListObjectId = new ObjectId();
            questionListIds.push(questionListObjectId);

            let questionChunkObjectId = new ObjectId();
            questionChunkIds.push(questionChunkObjectId);

            let questionId = new ObjectId();
            questionIds.push(questionId);

            let userId = "Test User Id " + i;
            userIds.push(userId);

            questionListNames.push("Test Question List Name " + i);

            const questionResult = createQuestion(i + "", questionId);
            const question: Question = questionResult.question;
            const questionListDb: QuestionList_Db = questionResult.questionListDb;
            const questionChunkDb: QuestionChunk_Db = questionResult.questionChunkDb;

            userResponses.push(questionResult.userResponse);
            questionList.push(questionResult.questionList);
            gradeQuestionChunks.push(questionResult.questionChunk);

            await putQuestionList(questionListObjectId, questionListDb);
            await putQuestionChunk(questionChunkObjectId, questionChunkDb),
            await putQuestion(questionId, question);
            await putQuestionResponses(userId, [questionResult.userResponse]);
        }

        const [
            fetchedAllQuestionsLists,
            fetchedQuestionsProgress,
        ] = await Promise.all([
            getAllQuestionLists(),
            getQuestionProgress(),
        ]);

        expect(fetchedAllQuestionsLists.length).toBe(manySizes);
        console.log(fetchedAllQuestionsLists);
        expect(fetchedQuestionsProgress.questionData.length).toBe(manySizes);

        for (let i = 0; i < fetchedAllQuestionsLists.length; i++) {
            expect(fetchedAllQuestionsLists[i]).toMatchObject(questionList[i]);
        }

        for (let i = 0; i < fetchedQuestionsProgress.questionData.length; i++) {
            expect(fetchedQuestionsProgress.questionData[i]).toMatchObject(questionList[i]);
        }

        for (let i = 0; i < manySizes; i++) {
            const fetchedQuestionList = await getQuestionList(questionListNames[i]);
            expect(fetchedQuestionList.chunks.length).toBe(testQuestionChunks.length);
            expect(fetchedQuestionList.chunks[0]).toMatchObject(gradeQuestionChunks[i]);
        }

        for (let i = 0; i < userIds.length; i++) {
            const fetchedQuestionResponse = await getQuestionResponses(userIds[i]);
            expect(fetchedQuestionResponse.length).toBe(1);
            expect(fetchedQuestionResponse[0]).toMatchObject(userResponses[i]);
        }
        done();
    };
    callback();
});
