"use strict";
exports.id = 422;
exports.ids = [422];
exports.modules = {

/***/ 422:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ QuestionSummaryCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(887);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(799);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9997);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mcq_question__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(457);
/* harmony import */ var _checkbox_question__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9553);
/* harmony import */ var _textinput_question__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9196);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3215);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8353);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












(react_modal__WEBPACK_IMPORTED_MODULE_3___default().defaultStyles.overlay.backgroundColor) = "rgba(177, 176, 176, 0.6)";
function QuestionSummaryCard({
  question,
  userAnswers,
  onUpdate,
  userTags
}) {
  const {
    0: displayingQuestion,
    1: setDisplayingQuestion
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: newTags,
    1: setNewTags
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    0: oldTags,
    1: setOldTags
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const {
    0: userAnswer,
    1: setUserAnswer
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(userAnswers.find(response => {
    return response.questionId === question._id;
  }) ? userAnswers.find(response => {
    return response.questionId === question._id;
  }) : {
    questionId: question._id,
    response: null
  });
  const {
    0: originalAnswer,
    1: setOriginalAnswer
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(JSON.parse(JSON.stringify(userAnswers.find(response => {
    return response.questionId === question._id;
  }) ? userAnswers.find(response => {
    return response.questionId === question._id;
  }) : {
    questionId: question._id,
    response: null
  })));
  const session = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_7__.useSession)();

  const filterDuplicates = toFilter => {
    return toFilter.filter((element, index, self) => {
      let indexOfDuplicate = self.findIndex(value => value === element);
      return indexOfDuplicate === -1 || index === indexOfDuplicate;
    });
  };

  const getQuestionType = () => {
    var _userAnswer$response;

    if (question.type === "TextInput") {
      return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_textinput_question__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z, {
        question: question,
        userAnswer: userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.response,
        onChange: answer => {
          setUserAnswer(_objectSpread(_objectSpread({}, userAnswer), {}, {
            response: answer
          }));
        }
      });
    }

    if (question.type === "MCQ") {
      return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_mcq_question__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z, {
        tags: userTags,
        question: question,
        userAnswer: userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.response,
        onChange: (answer, newQTags, oldQTags) => {
          setUserAnswer(_objectSpread(_objectSpread({}, userAnswer), {}, {
            response: answer
          }));
          setNewTags(filterDuplicates(newTags.concat(newQTags)));
          setOldTags(filterDuplicates(oldTags.concat(oldQTags)));
        }
      });
    }

    if (question.type === "CheckBox") {
      return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_checkbox_question__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, {
        tags: userTags,
        question: question,
        userAnswers: userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.response,
        onChange: (answer, newQTags, oldQTags) => {
          setUserAnswer(_objectSpread(_objectSpread({}, userAnswer), {}, {
            response: answer
          }));
          setNewTags(filterDuplicates(newTags.concat(newQTags)));
          setOldTags(filterDuplicates(oldTags.concat(oldQTags)));
        }
      });
    }

    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("span", {
        className: "pt-4 pb-2",
        style: {
          fontSize: "1.4em"
        },
        children: question.question
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
        className: "d-flex flex-column justify-content-evenly align-items-center h-75 w-100",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
          className: "w-75",
          children: (_userAnswer$response = userAnswer.response) !== null && _userAnswer$response !== void 0 ? _userAnswer$response : "No answer"
        })
      })]
    });
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    console.warn(newTags);
    console.log(oldTags);
  }, [newTags, oldTags]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "w-100 d-flex flex-column justify-content-evenly qsummary-card-container mt-3",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
      className: "d-flex justify-content-between align-items-center px-4 pt-3 question-text",
      children: [question.question, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("button", {
        onClick: () => {
          setDisplayingQuestion(true);
        },
        className: "icon-btn center-child",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
          style: {
            width: "40%"
          },
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faPencilAlt
          })
        })
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("span", {
      className: "ps-4 pb-4",
      children: userAnswer.response !== null ? userAnswer.response instanceof Array ? userAnswer.response.reduce((prev, curr) => {
        return prev === "" ? curr : prev + ", " + curr;
      }, "") : userAnswer.response : "No answer"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)((react_modal__WEBPACK_IMPORTED_MODULE_3___default()), {
      ariaHideApp: false,
      style: {
        content: {
          top: "30%",
          left: "35%",
          width: "30%",
          height: "fit-content",
          borderRadius: "20px",
          borderColor: "white"
        }
      },
      onRequestClose: () => {
        console.log(originalAnswer);
        setUserAnswer(originalAnswer);
        setNewTags([]);
        setOldTags([]);
        setDisplayingQuestion(false);
      },
      isOpen: displayingQuestion,
      children: [getQuestionType(), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("div", {
        className: "center-child w-100",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx("button", {
          onClick: async () => {
            let newUserResponses = userAnswers;
            let indexOfResponse = newUserResponses.findIndex(({
              questionId
            }) => {
              return questionId === userAnswer.questionId;
            });
            console.log(indexOfResponse);

            if (indexOfResponse !== -1) {
              newUserResponses[indexOfResponse] = userAnswer;
            } else {
              newUserResponses.push(userAnswer);
            }

            userTags.filter(value => !oldTags.includes(value));
            userTags.length === 0 ? userTags = newTags : userTags = userTags.concat(newTags);
            setNewTags([]);
            setOldTags([]);
            Promise.all([fetch(`${_config__WEBPACK_IMPORTED_MODULE_9__/* .ORIGIN_URL */ .c}/api/put-question-responses`, {
              method: "POST",
              body: JSON.stringify({
                responses: newUserResponses,
                userId: session.data.user.uid
              })
            })].concat(question.type === "MCQ" || question.type === "CheckBox" ? [fetch(`${_config__WEBPACK_IMPORTED_MODULE_9__/* .ORIGIN_URL */ .c}/api/update-user`, {
              method: "POST",
              body: JSON.stringify({
                userInfo: {
                  tags: userTags
                },
                userId: session.data.user.uid
              })
            })] : [])).then(reses => {
              reses.forEach(res => {
                console.log(res.status);
              });
              onUpdate(userTags);
              setOriginalAnswer(userAnswer);
              setDisplayingQuestion(false);
            });
          },
          className: "general-submit-btn mt-2",
          children: "SUBMIT"
        })
      })]
    })]
  });
}

/***/ })

};
;