"use strict";
exports.id = 336;
exports.ids = [336];
exports.modules = {

/***/ 4188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8353);
/* harmony import */ var next_auth_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);

 // logged in landing page




const UploadPage = ({
  children,
  onUpload
}) => {
  var _session$data, _session$data$user;

  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const session = (0,next_auth_react__WEBPACK_IMPORTED_MODULE_0__.useSession)();

  if (((_session$data = session.data) === null || _session$data === void 0 ? void 0 : (_session$data$user = _session$data.user) === null || _session$data$user === void 0 ? void 0 : _session$data$user.email) === "test31@gmail.com") {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: "container-fluid p-5 d-flex flex-column align-items-center justify-content-center",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "d-flex flex-column align-items-center w-50",
        children: [children, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
          className: "mt-3",
          onClick: () => {
            onUpload();
          },
          children: "Upload"
        })]
      })
    });
  }

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        children: "404"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        children: "This page could not be found."
      })]
    })
  });
};

UploadPage.requireAuth = true;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UploadPage);

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