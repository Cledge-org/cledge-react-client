/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 6937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getPathwayProgress": () => (/* binding */ getPathwayProgress),
/* harmony export */   "getSpecificPathwayProgress": () => (/* binding */ getSpecificPathwayProgress)
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7548);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2357);
/* harmony import */ var assert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(assert__WEBPACK_IMPORTED_MODULE_1__);


const config = {
  api: {
    externalResolver: true
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, resolve) => {
  const {
    pathwayId,
    userId
  } = JSON.parse(req.body);
  return !userId || !pathwayId ? resolve.status(400).send("No userId or courseId provided") : resolve.status(200).send(await getPathwayProgress(userId, pathwayId));
}); // Gets gets progress info for a specific learning pathway given pathway
// document id and a user id

async function getPathwayProgress(userId, pathwayId) {
  return new Promise((res, err) => {
    mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient.connect(process.env.MONGO_URL, async (connection_err, client) => {
      assert__WEBPACK_IMPORTED_MODULE_1___default().equal(connection_err, null);
      const pathwaysDb = client.db("pathways");
      const usersDb = client.db("users");
      const [pathway, userInfo, progressByModule] = await Promise.all([pathwaysDb.collection("pathways").findOne({
        _id: new mongodb__WEBPACK_IMPORTED_MODULE_0__.ObjectId(pathwayId)
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

/***/ }),

/***/ 4848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(607);
/* harmony import */ var next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_node_polyfill_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9450);
/* harmony import */ var next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8277);

        
      const { processEnv } = __webpack_require__(4227)
      processEnv([{"path":".env.local","contents":"NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=AIzaSyDIWezBqFoahyxyMGCAg8VPujjUf1FVZbU\r\nNEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=cledge-dev.firebaseapp.com\r\nNEXT_PUBLIC_FIREBASE_PROJECT_ID=cledge-dev\r\nGOOGLE_ID=257598879810-1q27ivpgp1d1p82g9c5ccqa0shauqr6e.apps.googleusercontent.com\r\nGOOGLE_SECRET=n7-66jM0sSDMPKOPqy18OnDa\r\nNEXT_AUTH_SECRET=YajOadU+8LfvgzUW0fiv4JKIwPeFiroCP2FKi/fwbHc\r\nMONGO_URL=mongodb://cledge-db:Tc7PYDfYtB1jBrPfBDPYSNLhlovMKU6AatyKbWPAE75IFy1tLEsczdULMYfaoiFu5bH9qbna704PQCdHBKT8YQ==@cledge-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@cledge-db@\r\n"}])
    
        
        const runtimeConfig = {}
        ;
        

        

        const combinedRewrites = Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)
          ? private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg
          : []

        if (!Array.isArray(private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites */ .Dg)) {
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.beforeFiles */ .Dg.beforeFiles)
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.afterFiles */ .Dg.afterFiles)
          combinedRewrites.push(...private_dot_next_routes_manifest_json__WEBPACK_IMPORTED_MODULE_1__/* .rewrites.fallback */ .Dg.fallback)
        }

        const apiHandler = (0,next_dist_build_webpack_loaders_next_serverless_loader_api_handler__WEBPACK_IMPORTED_MODULE_2__/* .getApiHandler */ .Y)({
          pageModule: __webpack_require__(6937),
          rewrites: combinedRewrites,
          i18n: undefined,
          page: "/api/get-pathway-progress",
          basePath: "",
          pageIsDynamic: false,
          encodedPreviewProps: {previewModeId:"1ee6482ceff0208ea9f507674d0b1a12",previewModeSigningKey:"639cd05a0baeefff5a3cfe453e75faa2b0f2272555f719f422a4a0d9ee99807e",previewModeEncryptionKey:"012a42c7811e0a8e3a3e4bd7ad3e5c786833345deabaecf31c96faa5221ec730"}
        })
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiHandler);
      

/***/ }),

/***/ 5517:
/***/ ((module) => {

module.exports = require("@hapi/accept");

/***/ }),

/***/ 4227:
/***/ ((module) => {

module.exports = require("@next/env");

/***/ }),

/***/ 2357:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 6063:
/***/ ((module) => {

module.exports = require("encoding");

/***/ }),

/***/ 8605:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 7211:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 7548:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 3140:
/***/ ((module) => {

module.exports = require("next/dist/server/api-utils.js");

/***/ }),

/***/ 9325:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 6044:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8300:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/detect-domain-locale.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/detect-locale-cookie.js");

/***/ }),

/***/ 5378:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 7189:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-match.js");

/***/ }),

/***/ 1346:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/prepare-destination.js");

/***/ }),

/***/ 333:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 3456:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1191:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 2413:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 8835:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 8761:
/***/ ((module) => {

module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, [2084,8277,9450], () => (__webpack_require__(4848)))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	                // Font manifest declaration
/******/ 	                __webpack_require__.__NEXT_FONT_MANIFEST__ = [{"url":"https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap","content":"@font-face{font-family:'Montserrat';font-style:italic;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R8aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq_p9aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq5Z9aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR6aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqw16aXw.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Ew9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC70w9.woff) format('woff')}@font-face{font-family:'Montserrat';font-style:italic;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:italic;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxC7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:italic;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRzS7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:italic;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxi7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:italic;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRxy7m0dR9pBOi.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:italic;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUQjIg1_i6t8kCHKm459WxRyS7m0dR9pA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:100;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:200;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:300;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:400;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:500;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:600;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:700;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:800;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:'Montserrat';font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0460-052F,U+1C80-1C88,U+20B4,U+2DE0-2DFF,U+A640-A69F,U+FE2E-FE2F}@font-face{font-family:'Montserrat';font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116}@font-face{font-family:'Montserrat';font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EF9,U+20AB}@font-face{font-family:'Montserrat';font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');unicode-range:U+0100-024F,U+0259,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF}@font-face{font-family:'Montserrat';font-style:normal;font-weight:900;font-display:swap;src:url(https://fonts.gstatic.com/s/montserrat/v21/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}"}];
/******/ 	            // Enable feature:
/******/ 	            process.env.__NEXT_OPTIMIZE_FONTS = JSON.stringify(true);
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = {
/******/ 			7582: 1,
/******/ 			6937: 1
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.O.require = (chunkId) => (installedChunks[chunkId]);
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 			__webpack_require__.O();
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("../../chunks/" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			__webpack_require__.e(2084);
/******/ 			__webpack_require__.e(8277);
/******/ 			__webpack_require__.e(9450);
/******/ 			return next();
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;