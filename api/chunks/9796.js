"use strict";
exports.id = 9796;
exports.ids = [9796];
exports.modules = {

/***/ 4193:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ ECEditor)
});

// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(887);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(799);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./components/question_components/ec_dropdown_question.tsx
var ec_dropdown_question = __webpack_require__(4679);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/question_components/ec_textinput_question.tsx



function ECTextInputQuestion({
  questionTitle,
  userResponse,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "w-100 d-flex flex-column justify-content-evenly pt-5",
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "fw-bold cl-dark-text pb-3",
      style: {
        fontSize: "1.4em"
      },
      children: questionTitle
    }), /*#__PURE__*/jsx_runtime_.jsx("input", {
      defaultValue: userResponse,
      type: "text",
      className: "form-control ec-text-input",
      placeholder: placeholder,
      onChange: () => {
        onChange();
      }
    })]
  });
}
// EXTERNAL MODULE: external "@fortawesome/free-regular-svg-icons"
var free_regular_svg_icons_ = __webpack_require__(9731);
;// CONCATENATED MODULE: ./components/question_components/ec_calendar_dropdown.tsx







function useOutsideAlerter(ref, handleClickOutside) {
  (0,external_react_.useEffect)(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function ECCalendarDropDown({
  onChange,
  initialDate
}) {
  const {
    0: chosen,
    1: setChosen
  } = (0,external_react_.useState)(initialDate ? initialDate : new Date());
  const {
    0: isOpen,
    1: setIsOpen
  } = (0,external_react_.useState)(false);
  const wrapperRef = (0,external_react_.useRef)(null);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let years = [];
  (0,external_react_.useEffect)(() => {
    let yearsList = [];

    for (let i = 0; i < 4; i++) {
      yearsList.push((chosen.getFullYear() - i).toString());
    }

    years = yearsList;
  }, []);
  useOutsideAlerter(wrapperRef, event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  });

  const changeChosen = value => {
    setChosen(value);
    onChange(value);
  };

  const buildDays = () => {
    let daysRows = [];
    let k = 0;
    let currDate = new Date(chosen.getFullYear(), chosen.getMonth(), 1);

    for (let i = 0; i < 6; i++) {
      let days = [];

      for (let j = 0; j < 7; j++) {
        if (i == 0 && currDate.getDay() <= j + 1 || i > 0 && currDate.getMonth() == chosen.getMonth()) {
          let copy = k + 1;
          days.push( /*#__PURE__*/jsx_runtime_.jsx("button", {
            onClick: () => {
              changeChosen(new Date(chosen.getFullYear(), chosen.getMonth(), copy));
            },
            className: chosen.getDay() === copy ? "day-btn-chosen" : "day-btn",
            children: copy
          }, copy + "ECCalendar"));
          currDate = new Date(chosen.getFullYear(), chosen.getMonth(), k + 2);
          k++;
        } else {
          days.push( /*#__PURE__*/jsx_runtime_.jsx("div", {
            style: {
              width: "45px",
              height: "45px"
            }
          }));
        }
      }

      daysRows.push( /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "d-flex w-100 justify-content-evenly align-items-center",
        children: days
      }));
    }

    return daysRows;
  };

  (0,external_react_.useEffect)(() => {
    typeof document !== undefined ? __webpack_require__(9595) : null;
  }, []);
  (0,external_react_.useEffect)(() => {
    console.log(chosen);
  }, [chosen]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "dropdown-container",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
      className: "ec-dropdown-btn",
      onClick: () => setIsOpen(!isOpen),
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "cl-dark-text",
        style: {
          fontWeight: 600
        },
        children: months[chosen.getMonth()] + " " + chosen.getFullYear()
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        style: {
          width: "20px"
        },
        className: "cl-mid-text",
        children: /*#__PURE__*/jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
          icon: free_regular_svg_icons_.faCalendarAlt
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      ref: wrapperRef,
      className: "dropdown-menu-custom ec-calendar-dropdown-menu",
      style: {
        display: isOpen ? "flex" : "none"
      },
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-flex justify-content-center align-items-center pt-2",
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "me-2",
          style: {
            width: "25%"
          },
          children: /*#__PURE__*/jsx_runtime_.jsx(ec_dropdown_question/* default */.Z, {
            forCalendar: true,
            onChange: () => {},
            defaultValue: months[chosen.getMonth() - 1],
            valuesList: months
          }, "-months")
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "ms-2",
          style: {
            width: "25%"
          },
          children: /*#__PURE__*/jsx_runtime_.jsx(ec_dropdown_question/* default */.Z, {
            forCalendar: true,
            defaultValue: chosen.getFullYear().toString(),
            valuesList: years
          }, "-years")
        })]
      }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "d-flex flex-column justify-content-evenly align-items-center pt-3",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "d-flex w-100 justify-content-evenly align-items-center",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "weekday-titles",
            children: "Mo"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "weekday-titles",
            children: "Tu"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "weekday-titles",
            children: "We"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "weekday-titles",
            children: "Th"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "weekday-titles",
            children: "Fr"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "weekday-titles",
            children: "Sa"
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "weekday-titles",
            children: "Su"
          })]
        }), buildDays()]
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./components/question_components/ec_timeframe_question.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





function ECTimeFrame({
  defaultEnd,
  defaultStart,
  defaultProgress,
  onChange
}) {
  const {
    0: interval,
    1: setInterval
  } = (0,external_react_.useState)({
    progress: defaultProgress ? defaultProgress : "none",
    start: defaultStart,
    finished: defaultEnd
  });
  (0,external_react_.useEffect)(() => {
    typeof document !== undefined ? __webpack_require__(9595) : null;
  }, []);
  (0,external_react_.useEffect)(() => {
    onChange(interval);
  }, [interval]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "w-100 d-flex flex-column justify-content-evenly pt-5",
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "fw-bold cl-dark-text pb-3",
      style: {
        fontSize: "1.4em"
      },
      children: "Time Frame"
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "d-flex w-100 flex-row justify-content-between align-items-center pb-3",
      children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
        onClick: () => {
          setInterval(_objectSpread(_objectSpread({}, interval), {}, {
            progress: "finished"
          }));
        },
        className: interval.progress === "finished" ? "cl-btn-gray-selected" : "cl-btn-gray",
        style: {
          width: "47%",
          fontSize: "1.1em"
        },
        children: "Finished"
      }), /*#__PURE__*/jsx_runtime_.jsx("button", {
        onClick: () => {
          setInterval(_objectSpread(_objectSpread({}, interval), {}, {
            progress: "ongoing"
          }));
        },
        className: interval.progress === "ongoing" ? "cl-btn-gray-selected" : "cl-btn-gray",
        style: {
          width: "47%",
          fontSize: "1.1em"
        },
        children: "Ongoing"
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "cl-mid-gray pb-2",
      style: {
        fontSize: "0.9em"
      },
      children: "Start:"
    }), /*#__PURE__*/jsx_runtime_.jsx(ECCalendarDropDown, {
      initialDate: interval.start,
      onChange: newStartDate => {
        setInterval(_objectSpread(_objectSpread({}, interval), {}, {
          start: newStartDate
        }));
      }
    }), interval.progress === "finished" ? /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "py-3"
    }) : null, interval.progress === "finished" ? /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "cl-mid-gray pb-2",
      style: {
        fontSize: "0.9em"
      },
      children: "Finish:"
    }) : null, interval.progress === "finished" ? /*#__PURE__*/jsx_runtime_.jsx(ECCalendarDropDown, {
      initialDate: interval.finished,
      onChange: newEndDate => {
        setInterval(_objectSpread(_objectSpread({}, interval), {}, {
          finished: newEndDate
        }));
      }
    }) : null]
  });
}
;// CONCATENATED MODULE: ./components/question_components/ec-editor.tsx








function ECEditor({
  onSave,
  chunkQuestions,
  isEditing,
  userResponse,
  index,
  onAbort
}) {
  const {
    0: newResponse,
    1: setNewResponse
  } = (0,external_react_.useState)(userResponse ? userResponse : []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "container-fluid h-100 d-flex flex-row align-items-center justify-content-center position-relative",
    style: {
      overflowY: "scroll"
    },
    children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
      onClick: () => {
        onAbort();
      },
      className: "ec-editor-btn-back",
      children: /*#__PURE__*/jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
        icon: free_solid_svg_icons_.faArrowLeft,
        color: "#000000"
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "align-self-center d-flex h-100 w-50 py-3 flex-column",
      style: {
        textAlign: "start"
      },
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "cl-dark-text",
        style: {
          fontSize: "1.8em",
          fontWeight: 800
        },
        children: isEditing ? "Editing Experience" : "Adding a New Experience"
      }), chunkQuestions.map(({
        question,
        type,
        _id,
        isConcatenable,
        data
      }) => {
        console.log(userResponse);

        if (type === "ECDropDown") {
          return /*#__PURE__*/jsx_runtime_.jsx(ec_dropdown_question/* default */.Z, {
            isConcatenable: isConcatenable,
            valuesList: data,
            onChange: value => {
              let totallyNewResponse = newResponse.slice();
              console.log(value);

              if (totallyNewResponse.find(({
                questionId
              }) => questionId === _id)) {
                totallyNewResponse.find(({
                  questionId
                }) => questionId === _id).response = value;
              } else {
                totallyNewResponse.push({
                  questionId: _id,
                  response: value
                });
              }

              setNewResponse(totallyNewResponse);
            },
            questionTitle: question,
            defaultValue: isEditing && userResponse && userResponse.find(({
              questionId
            }) => questionId === _id) ? userResponse.find(({
              questionId
            }) => questionId === _id).response : null
          }, _id);
        }

        if (type === "ECTextInput") {
          return /*#__PURE__*/jsx_runtime_.jsx(ECTextInputQuestion, {
            questionTitle: question,
            userResponse: isEditing && userResponse && userResponse.find(({
              questionId
            }) => questionId === _id) ? userResponse.find(({
              questionId
            }) => questionId === _id).response : "",
            placeholder: "",
            onChange: value => {
              let totallyNewResponse = newResponse.slice();

              if (totallyNewResponse.find(({
                questionId
              }) => questionId === _id)) {
                totallyNewResponse.find(({
                  questionId
                }) => questionId === _id).response = value;
              } else {
                totallyNewResponse.push({
                  questionId: _id,
                  response: value
                });
              }

              setNewResponse(totallyNewResponse);
            }
          });
        }

        if (type === "ECTimeFrame") {
          let response = isEditing && userResponse && userResponse.find(({
            questionId
          }) => questionId === _id) ? userResponse.find(({
            questionId
          }) => questionId === _id).response : {
            progress: "",
            finished: new Date(),
            start: new Date()
          };
          return /*#__PURE__*/jsx_runtime_.jsx(ECTimeFrame, {
            defaultProgress: response.progress,
            defaultStart: response.start instanceof Date ? response.start : new Date(response.start),
            defaultEnd: response.finished instanceof Date ? response.finished : new Date(response.finished),
            onChange: value => {
              let totallyNewResponse = newResponse.slice();

              if (totallyNewResponse.find(({
                questionId
              }) => questionId === _id)) {
                totallyNewResponse.find(({
                  questionId
                }) => questionId === _id).response = value;
              } else {
                totallyNewResponse.push({
                  questionId: _id,
                  response: value
                });
              }

              setNewResponse(totallyNewResponse);
            }
          });
        }

        return null;
      }), /*#__PURE__*/jsx_runtime_.jsx("button", {
        onClick: () => onSave(newResponse),
        className: "cl-btn-blue align-self-center mt-5",
        style: {
          transform: "scale(1.2)"
        },
        children: "Save"
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "py-4"
      })]
    })]
  });
}

/***/ }),

/***/ 7369:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ECQuestionSummaryCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(887);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(799);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9997);
/* harmony import */ var react_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_modal__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);






(react_modal__WEBPACK_IMPORTED_MODULE_3___default().defaultStyles.overlay.backgroundColor) = "rgba(177, 176, 176, 0.6)";
function ECQuestionSummaryCard({
  response,
  chunkQuestions,
  onClick
}) {
  const {
    0: displayingQuestion,
    1: setDisplayingQuestion
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const titleQuestion = response.find(({
    questionId
  }) => {
    var _chunkQuestions$find;

    return questionId === ((_chunkQuestions$find = chunkQuestions.find(({
      question
    }) => question === "Title")) === null || _chunkQuestions$find === void 0 ? void 0 : _chunkQuestions$find._id);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "w-100 d-flex flex-column justify-content-evenly qsummary-card-container mt-3",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "d-flex justify-content-between align-items-center px-4 pt-3 question-text",
      children: [titleQuestion ? titleQuestion.response : "No Title Given", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("button", {
        onClick: () => onClick(),
        className: "icon-btn center-child",
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          onClick: () => {
            setDisplayingQuestion(true);
          },
          style: {
            width: "40%"
          },
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faPencilAlt
          })
        })
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: "w-100 d-flex align-items-center justify-content-center ecsummary-info-container",
      children: chunkQuestions.map(({
        question,
        type,
        _id
      }) => question !== "Title" ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "ecsummary-info-section",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "name",
          children: question.toLocaleUpperCase()
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "value",
          children: response.find(({
            questionId
          }) => _id === questionId) !== undefined ? response.find(({
            questionId
          }) => _id === questionId).response instanceof Array ? response.find(({
            questionId
          }) => _id === questionId).response.reduce((prev, curr) => {
            return prev === "" ? curr : prev + ", " + curr;
          }, "") : response.find(({
            questionId
          }) => _id === questionId).response : "Not Answered"
        })]
      }) : null)
    })]
  });
}

/***/ })

};
;