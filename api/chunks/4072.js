"use strict";
exports.id = 4072;
exports.ids = [4072];
exports.modules = {

/***/ 7021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


function Card({
  isCardTask,
  title,
  child,
  url,
  classNames = "col-lg-4 col-md-6 col-xs-12 p-3 px-4",
  textGradient
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
    className: classNames,
    onClick: () => {
      if (isCardTask !== undefined && !isCardTask) {
        location.href = url;
      }
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      style: {
        minHeight: "35vh"
      },
      className: "card-container px-4 w-100 h-100 d-flex flex-column shadow",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: textGradient === "light" ? "card-title pt-2 red-purple-text-gradient" : "card-title pt-2 blue-purple-text-gradient",
        children: title
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "w-100 wrap overflow-hidden p-3 d-flex flex-column",
        style: {
          flex: 3
        },
        children: child
      })]
    })
  });
}

/***/ }),

/***/ 3211:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ TabButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


function TabButton({
  onClick,
  title,
  currTab
}) {
  const cledgeBlue = "#2651ed";
  const midGray = "#656565";
  const lowerCaseName = title.toLowerCase();
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
    className: "resources-tab-nav-btn col-3 col-lg-2",
    id: lowerCaseName + "-tab",
    onClick: () => {
      onClick(lowerCaseName);
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      style: {
        width: "fit-content",
        color: currTab === lowerCaseName ? cledgeBlue : midGray,
        fontWeight: currTab === lowerCaseName ? 700 : 500
      },
      children: [title, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
          height: "3px",
          backgroundColor: currTab === lowerCaseName ? cledgeBlue : "transparent"
        }
      })]
    })
  });
}

/***/ })

};
;