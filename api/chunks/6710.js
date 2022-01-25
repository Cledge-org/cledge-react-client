"use strict";
exports.id = 6710;
exports.ids = [6710];
exports.modules = {

/***/ 6710:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ QuestionSubPageHeader)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_circular_progressbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5878);
/* harmony import */ var react_circular_progressbar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_circular_progressbar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);




function QuestionSubPageHeader({
  title,
  percentage,
  subText,
  isExtracurricular,
  onAddNew
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "d-flex flex-row justify-content-between align-items-center px-3 mx-5",
    style: {
      height: "15%"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "question-subpage-title",
      children: [title, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        className: "sub-text",
        children: subText
      })]
    }), isExtracurricular ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
      onClick: () => onAddNew(),
      className: "cl-btn-blue py-3",
      style: {
        paddingLeft: "2.5vw",
        paddingRight: "2.5vw"
      },
      children: "Add New"
    }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      style: {
        width: "10vh"
      },
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_circular_progressbar__WEBPACK_IMPORTED_MODULE_1__.CircularProgressbarWithChildren, {
        strokeWidth: 10,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
          style: {
            fontWeight: "bold",
            fontSize: "1.3em"
          },
          children: `${percentage}%`
        }),
        className: "center-child",
        styles: {
          text: {
            fontWeight: "bold"
          },
          trail: {
            stroke: "#d6d6d6"
          },
          path: {
            transition: "stroke-dashoffset 0.5s ease 0s",
            stroke: "#2651ed"
          }
        },
        value: percentage
      })
    })]
  });
}

/***/ })

};
;