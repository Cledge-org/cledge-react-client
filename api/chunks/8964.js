"use strict";
exports.id = 8964;
exports.ids = [8964];
exports.modules = {

/***/ 8964:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ YoutubeEmbed)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function YoutubeEmbed({
  videoId,
  isPathway,
  onVideoTimeUpdate,
  videoTime,
  isVideoFinished
}) {
  //**********************************
  //**********************************
  //****************NOTE*************:
  //THIS ALL WORKS EVEN THOUGH IT DOESN'T LOOK LIKE IT DOES!
  //*************************************
  const {
    0: player,
    1: setPlayer
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    0: intervalId,
    1: setIntervalId
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  console.log(videoTime);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.log("UPDATING");
  }, [intervalId]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isPathway && intervalId === null) {
      setIntervalId(setInterval(() => {
        setPlayer(player => {
          console.log(videoId);
          onVideoTimeUpdate(player);
          return player;
        });
      }, 10000));
    }

    console.log(videoId);

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.type = "text/javascript";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setPlayer(new window.YT.Player(videoId, {
          videoId,
          playerVars: {
            start: !isVideoFinished && videoTime ? videoTime : 0
          }
        }));
      };
    } else {
      setPlayer(new window.YT.Player(videoId, {
        videoId,
        playerVars: {
          start: !isVideoFinished && videoTime ? videoTime : 0
        }
      }));
    }

    return () => {
      let retreivedIntervalId = null;
      setIntervalId(intervalId => {
        retreivedIntervalId = intervalId;
        return intervalId;
      });
      clearInterval(retreivedIntervalId);
    };
  }, []);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: `center-child m-0 p-0 ${isPathway ? "h-100" : "h-auto"}`,
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      id: videoId,
      style: {
        maxWidth: "90vw",
        minWidth: "300px",
        minHeight: "200px",
        width: "100%",
        height: isPathway ? "100%" : "50%"
      }
    })
  });
}

/***/ })

};
;