"use strict";
exports.id = 6937;
exports.ids = [6937];
exports.modules = {

/***/ 6937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSpecificPathwayProgress": () => (/* binding */ getSpecificPathwayProgress)
/* harmony export */ });
/* unused harmony exports config, getPathwayProgress */
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
    pathwayId,
    userId
  } = JSON.parse(req.body);
  return !userId || !pathwayId ? resolve.status(400).send("No userId or courseId provided") : resolve.status(200).send(await getPathwayProgress(userId, pathwayId));
}); // Gets gets progress info for a specific learning pathway given pathway
// document id and a user id

async function getPathwayProgress(userId, pathwayId) {
  return new Promise((res, err) => {
    MongoClient.connect(process.env.MONGO_URL, async (connection_err, client) => {
      assert.equal(connection_err, null);
      const pathwaysDb = client.db("pathways");
      const usersDb = client.db("users");
      const [pathway, userInfo, progressByModule] = await Promise.all([pathwaysDb.collection("pathways").findOne({
        _id: new ObjectId(pathwayId)
      }), usersDb.collection("users").findOne({
        firebaseId: userId
      }), pathwaysDb.collection("progress-by-user").findOne({
        firebaseId: userId
      })]);
      res(await getSpecificPathwayProgress(userInfo.tags, pathway, pathwaysDb, progressByModule));
    });
  });
} // Gets progress for a specific learning pathway progress give a user's tags,
// pathway information (database type), database, and user progress by module

async function getSpecificPathwayProgress(userTags, pathway, pathwaysDb, progressByModule) {
  return new Promise(async (res, err) => {
    let moduleProgress = await Promise.all(pathway.modules.map(moduleId => getSpecificModuleProgress(userTags, progressByModule, moduleId, pathwaysDb)));
    moduleProgress = moduleProgress.filter(({
      title
    }) => {
      return title !== "NULL MODULE";
    });
    res({
      finished: moduleProgress.reduce((prev, cur) => prev && cur.finished, true),
      moduleProgress,
      title: pathway.title,
      pathwayId: pathway._id
    });
  });
}

async function getSpecificModuleProgress(userTags, progressByModule, moduleId, pathwaysDb) {
  return new Promise(async (res, err) => {
    try {
      const [module, modulePersonalizedContent] = await Promise.all([pathwaysDb.collection("modules").findOne({
        _id: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(moduleId)
      }), pathwaysDb.collection("personalized-content").find({
        tags: {
          $in: userTags
        },
        moduleId
      }).toArray()]);

      if (module) {
        let moduleContentProgress = progressByModule[module._id];

        if (!moduleContentProgress) {
          moduleContentProgress = [];
        }

        const titles = new Set();
        moduleContentProgress.forEach(progress => {
          titles.add(progress.title);
        }); // Iterate through preset and presonalized contents and find contents not in progress, add them as unfinished

        if (module.presetContent) {
          module.presetContent.forEach((content, index) => {
            if (!titles.has(content.title)) {
              moduleContentProgress.push({
                title: content.title,
                finished: false,
                videoTime: 0
              });
            }
          });
        }

        if (modulePersonalizedContent) {
          modulePersonalizedContent.forEach(content => {
            if (!titles.has(content.title)) {
              moduleContentProgress.push({
                title: content.title,
                finished: false,
                videoTime: 0
              });
            }
          });
        }

        res({
          moduleId: moduleId.toString(),
          finished: moduleContentProgress.reduce((prev, cur) => prev && cur.finished, true),
          contentProgress: moduleContentProgress,
          title: module.title
        });
      } else {
        res({
          moduleId: moduleId.toString(),
          finished: false,
          contentProgress: [],
          title: "NULL MODULE"
        });
      }
    } catch (e) {
      err(e);
    }
  });
}

/***/ })

};
;