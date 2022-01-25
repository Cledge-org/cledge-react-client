"use strict";
exports.id = 1487;
exports.ids = [1487];
exports.modules = {

/***/ 1487:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getQuestionListWithDocumentAndDatabase": () => (/* binding */ getQuestionListWithDocumentAndDatabase)
/* harmony export */ });
/* unused harmony exports config, getQuestionList, getQuestionListWithDatabase */
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7548);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2357);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assert__WEBPACK_IMPORTED_MODULE_1__);


const config = {
  api: {
    externalResolver: true
  }
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (async (req, resolve) => {
  const {
    listName
  } = JSON.parse(req.body);
  return !listName ? resolve.status(400).send("No list name provided") : resolve.status(200).send(await getQuestionList(listName));
}); // Gets a question list with its chunks populated

async function getQuestionList(listName) {
  return new Promise((res, err) => {
    MongoClient.connect(process.env.MONGO_URL, async (connection_err, client) => {
      assert.equal(connection_err, null);
      const questionsDb = client.db("questions");
      res(await getQuestionListWithDatabase(listName, questionsDb));
    });
  });
} // Gets and populates list given its name and database

const getQuestionListWithDatabase = (listName, questionsDb) => {
  return new Promise(async (res, err) => {
    try {
      const gradeQuestionList = await questionsDb.collection("question-lists").findOne({
        name: listName
      }); // Question list chunks are currently just chunk ids, we need to fetch from database

      const gradeQuestionChunks = await Promise.all(gradeQuestionList.chunks.map(chunkName => getQuestionChunk(chunkName, questionsDb))); // Populate question list chunks

      res({
        _id: gradeQuestionList._id,
        name: gradeQuestionList.name,
        chunks: gradeQuestionChunks
      });
    } catch (e) {
      err(e);
    }
  });
}; // Gets and populates list given its database document and database

const getQuestionListWithDocumentAndDatabase = (list, questionsDb) => {
  return new Promise(async (res, err) => {
    try {
      const gradeQuestionChunks = await Promise.all(list.chunks.map(chunkName => getQuestionChunk(chunkName, questionsDb))); // Populate question list chunks

      res({
        _id: list._id,
        name: list.name,
        chunks: gradeQuestionChunks
      });
    } catch (e) {
      err(e);
    }
  });
}; // Gets and populates chunk given its name and database

const getQuestionChunk = (chunkName, questionsDb) => {
  return new Promise(async (res, err) => {
    try {
      const chunk = await questionsDb.collection("question-chunks").findOne({
        name: chunkName
      });

      if (chunk === null) {
        res({
          _id: null,
          name: "NULL CHUNK",
          questions: []
        });
        return;
      } // Chunk questions are currently just question ids, we need to fetch from database


      const chunkQuestions = await Promise.all(chunk.questions.map(questionId => questionsDb.collection("question-data").findOne({
        _id: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(questionId)
      })));
      res({
        _id: chunk._id,
        name: chunk.name,
        questions: chunkQuestions
      });
    } catch (e) {
      err(e);
    }
  });
};

/***/ })

};
;