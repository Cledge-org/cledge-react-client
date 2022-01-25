"use strict";
exports.id = 7891;
exports.ids = [7891];
exports.modules = {

/***/ 9553:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ CheckBoxQuestion)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(887);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(799);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/common/CheckBox.tsx




function CheckBox({
  selected,
  setSelected
}) {
  return /*#__PURE__*/jsx_runtime_.jsx("button", {
    onClick: () => {
      setSelected(!selected);
    },
    className: "checkbox-container",
    children: /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: selected ? "checkbox-true" : "checkbox",
      children: selected ? /*#__PURE__*/jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
        icon: free_solid_svg_icons_.faCheck,
        color: "#ffffff"
      }) : null
    })
  });
}
;// CONCATENATED MODULE: ./components/question_components/checkbox_question.tsx




function CheckBoxQuestion({
  question,
  userAnswers,
  onChange,
  tags
}) {
  const {
    0: selected,
    1: setSelected
  } = (0,external_react_.useState)(userAnswers !== null ? userAnswers.slice() : []);
  (0,external_react_.useEffect)(() => {
    console.log(selected);
  }, [selected]);

  let changeSelected = value => {
    let selectedCopy = selected.slice();

    if (selectedCopy.includes(value)) {
      selectedCopy.splice(selectedCopy.indexOf(value), 1);
    } else {
      selectedCopy.push(value);
    }

    let oldTags = userAnswers === null || userAnswers === void 0 ? void 0 : userAnswers.map((checkedOp, index) => {
      var _question$data$find;

      return (_question$data$find = question.data.find(({
        tag,
        op
      }) => op === checkedOp)) === null || _question$data$find === void 0 ? void 0 : _question$data$find.tag;
    });
    setSelected(selectedCopy);
    onChange(selectedCopy, selectedCopy.map((checkedOp, index) => {
      var _question$data$find2;

      return (_question$data$find2 = question.data.find(({
        tag,
        op
      }) => op === checkedOp)) === null || _question$data$find2 === void 0 ? void 0 : _question$data$find2.tag;
    }), oldTags);
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold",
    children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
      className: "pt-4 pb-2",
      style: {
        fontSize: "1.4em"
      },
      children: question.question
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "d-flex flex-column justify-content-evenly align-items-center h-75 w-100",
      children: question.data.map(({
        op,
        tag
      }) => {
        return /*#__PURE__*/(0,jsx_runtime_.jsxs)("button", {
          onClick: () => {
            console.log(tag);
            changeSelected(op);
          },
          className: selected.includes(op) ? "checkbox-mcq-variant-selected" : "checkbox-mcq-variant",
          children: [op, /*#__PURE__*/jsx_runtime_.jsx(CheckBox, {
            selected: selected.includes(op),
            setSelected: () => {
              changeSelected(op);
            }
          })]
        }, op);
      })
    })]
  });
}

/***/ }),

/***/ 457:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ MCQQuestion)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



function MCQQuestion({
  question,
  userAnswer,
  onChange,
  tags
}) {
  const {
    0: selected,
    1: setSelected
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(userAnswer === null || userAnswer === void 0 ? void 0 : userAnswer.slice());
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "container-fluid h-100 d-flex flex-column align-items-center justify-content-evenly w-100 cl-dark-text fw-bold",
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
      className: "pt-4 pb-2",
      style: {
        fontSize: "1.4em"
      },
      children: question.question
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: "d-flex flex-column justify-content-evenly align-items-center h-75 w-100",
      children: question.data.map(({
        op,
        tag
      }) => {
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
          onClick: () => {
            var _question$data$find;

            let oldTag = (_question$data$find = question.data.find(({
              op
            }) => userAnswer === op)) === null || _question$data$find === void 0 ? void 0 : _question$data$find.tag;
            setSelected(op);
            onChange(op, [tag], oldTag ? [oldTag] : []);
          },
          className: selected === op ? "mcq-answer-btn-selected" : "mcq-answer-btn",
          children: op
        });
      })
    })]
  });
}

/***/ })

};
;