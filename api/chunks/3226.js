"use strict";
exports.id = 3226;
exports.ids = [3226];
exports.modules = {

/***/ 3226:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DropDownTab)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9731);
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(887);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(799);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);






function DropDownTab({
  chunkList,
  title,
  percentComplete,
  isAll,
  onClick,
  isExtracurricular,
  isPathway,
  currSelectedPath,
  isFinishedModule,
  isFinishedContent
}) {
  const {
    0: isExpanded,
    1: setIsExpanded
  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "progress-dropdown-container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
      className: "progress-dropdown-btn",
      onClick: () => {
        if (isAll) {
          onClick();
        }

        setIsExpanded(!isExpanded);
      },
      style: isFinishedModule ? {
        borderBottomColor: "#2651ed"
      } : {},
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "text",
        children: [title, isAll || isPathway ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
          className: "percentage",
          children: [percentComplete, "%"]
        })]
      }), isAll ? null : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
        className: isExpanded ? "center-child icon-open" : "center-child icon-close",
        style: {
          width: "12px",
          height: "12px"
        },
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
          icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faChevronDown
        })
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
      className: isExpanded ? "progress-dropdown-menu-expanded" : "progress-dropdown-menu-closed",
      children: chunkList.map((chunkTitle, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
        onClick: () => {
          // if (isExtracurricular || isPathway) {
          //   onClick(chunkTitle);
          //   return;
          // }
          onClick(isPathway ? chunkTitle.title : chunkTitle);
        },
        className: currSelectedPath === title + (isPathway ? chunkTitle.title : chunkTitle) ? "progress-dropdown-menu-btn-selected" : "progress-dropdown-menu-btn",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "center-child icon",
          style: {
            width: `36px`,
            height: `36px`
          },
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_2__.FontAwesomeIcon, {
            className: `${isPathway ? isFinishedModule || isFinishedContent[index] ? "cl-blue" : "" : ""}`,
            style: isPathway ? isFinishedModule || isFinishedContent[index] ? {
              fontSize: "1.3em"
            } : {} : {},
            icon: isPathway ? isFinishedModule || isFinishedContent[index] ? _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faCheckCircle : chunkTitle.type.toLowerCase() === "article" ? _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faFileAlt : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faVideo : _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__.faFileAlt
          })
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx("div", {
          className: "text",
          children: isPathway ? chunkTitle.title : chunkTitle
        })]
      }))
    })]
  });
}

/***/ })

};
;