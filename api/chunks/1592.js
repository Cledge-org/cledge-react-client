"use strict";
exports.id = 1592;
exports.ids = [1592];
exports.modules = {

/***/ 9196:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ TextInputQuestion)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);



function TextInputQuestion({
  question,
  userAnswer,
  onChange
}) {
  const {
    0: currValue,
    1: setCurrValue
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(userAnswer);
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
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        defaultValue: currValue,
        type: "text",
        onChange: e => {
          setCurrValue(e.target.value);
          onChange(e.target.value);
        },
        className: "form-control w-75",
        placeholder: "Your response..."
      })
    })]
  });
}

/***/ }),

/***/ 3215:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ ORIGIN_URL)
/* harmony export */ });
/* unused harmony export MONGO_CONNECTION_STRING */
const MONGO_CONNECTION_STRING = "mongodb://cledge-db:Tc7PYDfYtB1jBrPfBDPYSNLhlovMKU6AatyKbWPAE75IFy1tLEsczdULMYfaoiFu5bH9qbna704PQCdHBKT8YQ==@cledge-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@cledge-db@";
const ORIGIN_URL =  false ? 0 : "https://cledge-first-test.vercel.app";

/***/ })

};
;