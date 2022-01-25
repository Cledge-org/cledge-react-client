exports.id = 2380;
exports.ids = [2380];
exports.modules = {

/***/ 6552:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LoadingScreen)
/* harmony export */ });
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7949);
/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_mui_material__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function LoadingScreen() {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: "center-child vw-100 vh-100",
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_mui_material__WEBPACK_IMPORTED_MODULE_0__.CircularProgress, {
      className: "cl-blue"
    })
  });
}

/***/ }),

/***/ 5773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(8353);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/common/Header.tsx






function Header({
  key
}) {
  const {
    data: session,
    status
  } = (0,react_.useSession)();
  const router = (0,router_.useRouter)();
  console.log();
  let listener = null;
  const {
    0: scrollState,
    1: setScrollState
  } = (0,external_react_.useState)("top");
  const {
    0: colors,
    1: setColors
  } = (0,external_react_.useState)(router.pathname === "/" ? "cl-white" : "cl-blue");
  var navclass = "";

  if (router.pathname === "/") {
    navclass = "position-fixed fixed-top";
  } else {
    navclass = "nav-regular";
  }

  (0,external_react_.useEffect)(() => {
    typeof document !== undefined ? __webpack_require__(9595) : null;
    document.removeEventListener("scroll", listener);
    listener = document.body.addEventListener("scroll", e => {
      var scrolled = document.body.scrollTop;

      if (scrolled > 0) {
        if (scrollState !== "scrolling") {
          setScrollState("scrolling");
          setColors("cl-blue");
        }
      } else {
        if (scrollState !== "top") {
          setScrollState("top");

          if (router.pathname === "/") {
            setColors("cl-white");
          }
        }
      }
    });
    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, [scrollState]);
  return /*#__PURE__*/jsx_runtime_.jsx("nav", {
    className: `w-100 navbar cl-blue navbar-expand-md px-3 ${navclass} ${scrollState !== "scrolling" && router.pathname === "/" ? "position-absolute top-0 start-0 nav-transparent" : scrollState !== "scrolling" ? "sticky-top nav-regular shadow-none" : "sticky-top nav-regular"}`,
    style: {
      zIndex: 2000
    },
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "container-fluid",
      children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: "/",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          className: `navbar-brand mx-4`,
          style: {
            fontSize: "1.5em",
            fontWeight: 600
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("span", {
            className: `${colors}`,
            children: "cledge."
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("button", {
        className: "navbar-toggler",
        type: "button",
        "data-bs-toggle": "collapse",
        "data-bs-target": "#navbarNavAltMarkup",
        "aria-controls": "navbarNavAltMarkup",
        "aria-expanded": "false",
        "aria-label": "Toggle navigation",
        children: /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "navbar-toggler-icon"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx("div", {
        className: "fs-7 collapse navbar-collapse justify-content-end",
        id: "navbarNavAltMarkup",
        children: status === "authenticated" ? /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "navbar-nav",
          children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/dashboard",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "nav-link",
              style: {
                fontWeight: 600
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: `${colors}`,
                children: "My Learning"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/resources",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "nav-link",
              style: {
                fontWeight: 600
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: `${colors}`,
                children: "Resources"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/progress",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "nav-link",
              style: {
                fontWeight: 600
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: `${colors}`,
                children: "Progress"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/account",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "nav-link",
              style: {
                fontWeight: 600
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: `${colors}`,
                children: "My Account"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/api/auth/signout",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "nav-link",
              style: {
                fontWeight: 600
              },
              href: "",
              children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: `${colors}`,
                children: "Log Out"
              })
            })
          })]
        }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "navbar-nav",
          children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/resources",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "nav-link",
              style: {
                fontWeight: 600
              },
              children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: `${colors}`,
                children: "Resources"
              })
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/api/auth/signin",
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              className: "nav-link",
              style: {
                fontWeight: 600
              },
              href: "",
              children: /*#__PURE__*/jsx_runtime_.jsx("span", {
                className: `${colors}`,
                children: "Log In"
              })
            })
          })]
        })
      })]
    })
  }, key);
}
// EXTERNAL MODULE: ./components/common/loading.tsx
var common_loading = __webpack_require__(6552);
;// CONCATENATED MODULE: ./components/common/Layout.tsx






function Layout({
  children
}) {
  const router = (0,router_.useRouter)();
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const {
    0: header,
    1: setHeader
  } = (0,external_react_.useState)( /*#__PURE__*/jsx_runtime_.jsx(Header, {}, "initial"));
  (0,external_react_.useEffect)(() => {
    let numTimes = 1;

    const endLoading = () => {
      setLoading(false);
    };

    const endLoadingShowNewHeader = () => {
      setLoading(false);
      numTimes++;
      setHeader( /*#__PURE__*/jsx_runtime_.jsx(Header, {}, numTimes.toString()));
    };

    const startLoading = () => {
      setLoading(true);
    };

    router_.Router.events.on("routeChangeStart", startLoading);
    router_.Router.events.on("routeChangeError", endLoading);
    router_.Router.events.on("routeChangeComplete", endLoadingShowNewHeader);
    return () => {
      router_.Router.events.off("routeChangeComplete", endLoadingShowNewHeader);
      router_.Router.events.off("routeChangeStart", startLoading);
      router_.Router.events.off("routeChangeError", endLoading);
    };
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [router.pathname === "/[questionnaire]" ? null : header, loading ? /*#__PURE__*/jsx_runtime_.jsx(common_loading/* default */.Z, {}) : /*#__PURE__*/jsx_runtime_.jsx("main", {
      children: children
    })]
  });
}
// EXTERNAL MODULE: external "@reduxjs/toolkit"
var toolkit_ = __webpack_require__(6139);
;// CONCATENATED MODULE: ./utils/authstate.ts

const initialState = {
  authenticated: false,
  firstName: null,
  lastName: null,
  email: null,
  tags: []
};
const authStateSlice = (0,toolkit_.createSlice)({
  name: "authstate",
  initialState,
  reducers: {
    toggleAuthenticated: state => {
      state.authenticated = !state.authenticated;
    }
  }
});
const {
  toggleAuthenticated
} = authStateSlice.actions;
/* harmony default export */ const authstate = (authStateSlice.reducer);
;// CONCATENATED MODULE: ./utils/store.ts


const store = (0,toolkit_.configureStore)({
  reducer: {
    authstate: authstate
  }
}); // Infer the `RootState` and `AppDispatch` types from the store itself
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
;// CONCATENATED MODULE: ./components/common/ProtectedComponent.tsx






function ProtectedComponent({
  children
}) {
  const session = (0,react_.useSession)();
  const router = (0,router_.useRouter)();
  (0,external_react_.useEffect)(() => {
    console.log(session.data);

    if (session.status === "unauthenticated") {
      console.log("not authenticated. redirecting");
      router.push("/auth/login");
    }
  }, [session, router]);

  if (session.status === "loading") {
    return /*#__PURE__*/jsx_runtime_.jsx(common_loading/* default */.Z, {});
  }

  if (session.status === "authenticated") {
    return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
      children: children
    });
  }

  return null;
}
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




















function MyApp({
  Component,
  pageProps
}) {
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const router = (0,router_.useRouter)();
  (0,external_react_.useEffect)(() => {
    const endLoading = () => {
      setLoading(false);
    };

    const endLoadingShowNewHeader = () => {
      setLoading(false);
    };

    const startLoading = () => {
      if (router.pathname === "/" || router.pathname === "") {
        setLoading(true);
      }
    };

    router_.Router.events.on("routeChangeStart", startLoading);
    router_.Router.events.on("routeChangeError", endLoading);
    router_.Router.events.on("routeChangeComplete", endLoadingShowNewHeader);
    return () => {
      router_.Router.events.off("routeChangeComplete", endLoadingShowNewHeader);
      router_.Router.events.off("routeChangeStart", startLoading);
      router_.Router.events.off("routeChangeError", endLoading);
    };
  }, [router]);

  if (loading) {
    return /*#__PURE__*/jsx_runtime_.jsx(common_loading/* default */.Z, {});
  }

  return /*#__PURE__*/jsx_runtime_.jsx(react_.SessionProvider, {
    session: pageProps.session,
    children: /*#__PURE__*/jsx_runtime_.jsx(external_react_redux_.Provider, {
      store: store,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Layout, {
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
          children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
            children: "Cledge"
          }), /*#__PURE__*/jsx_runtime_.jsx("link", {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
          }), /*#__PURE__*/jsx_runtime_.jsx("link", {
            rel: "stylesheet",
            type: "text/css",
            charSet: "UTF-8",
            href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          }), /*#__PURE__*/jsx_runtime_.jsx("link", {
            rel: "stylesheet",
            type: "text/css",
            href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          }), /*#__PURE__*/jsx_runtime_.jsx("link", {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "true"
          }), /*#__PURE__*/jsx_runtime_.jsx("link", {
            href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
            rel: "stylesheet"
          }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
            name: "viewport",
            content: "width=device-width, initial-scale=1"
          }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
            name: "description",
            content: "Generated by create next app"
          }), /*#__PURE__*/jsx_runtime_.jsx("link", {
            rel: "icon",
            href: "/favicon.ico"
          })]
        }), Component.requireAuth ? /*#__PURE__*/jsx_runtime_.jsx(ProtectedComponent, {
          children: /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
        }) : /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))]
      })
    })
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 2431:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 7020:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"polyfillFiles":["static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js"],"devFiles":[],"ampDevFiles":[],"lowPriorityFiles":["static/vpo3o0AxJQXapDJq7yu5a/_buildManifest.js","static/vpo3o0AxJQXapDJq7yu5a/_ssgManifest.js"],"pages":{"/":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/a9a7754c-3c1560eb8c2af1aeeda9.js","static/css/3c0bcf4d9cae10e05d5d.css","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/814-496de8360acaa2f6287d.js","static/chunks/869-d39729f2723c48fb01f9.js","static/css/17597d3694d41727ad30.css","static/chunks/pages/index-71756796c1d484a412fe.js"],"/[questionnaire]":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/pages/[questionnaire]-ae72df74a3d3eda53cc9.js"],"/_app":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/css/8d94a4d2391aceccede2.css","static/chunks/pages/_app-533a5db67d2d3bf5e23a.js"],"/_error":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/pages/_error-737a04e9a0da63c9d162.js"],"/account":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/47-4b7a83e04388513fa093.js","static/chunks/pages/account-c6580b56d4631f8aa911.js"],"/auth/login":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/pages/auth/login-1fa77e38e487b1446a3f.js"],"/auth/login2":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/pages/auth/login2-1cc403762c836caa4baa.js"],"/auth/reset_password":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/pages/auth/reset_password-5cd553219078e6b05ad9.js"],"/auth/signout":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/pages/auth/signout-6d9fbaad6a5350cc14ff.js"],"/auth/signup":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/faee2839-60f17ea2ab87427f67b2.js","static/chunks/705-58ae29921ab70a0538c4.js","static/chunks/pages/auth/signup-1461be6bbb5a60b271b3.js"],"/dashboard":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/pages/dashboard-a3eb8a0950706a224e2e.js"],"/pathways/[id]":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/24-27d8cc2fc3f8a8d46976.js","static/chunks/pages/pathways/[id]-9f5356b6c045ac84aae0.js"],"/progress":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/47-4b7a83e04388513fa093.js","static/chunks/24-27d8cc2fc3f8a8d46976.js","static/chunks/771-602be6d7c2b06f988a8b.js","static/chunks/pages/progress-9d1e0d69500af3ad1ad2.js"],"/questionPages/question_ec_subpage":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/47-4b7a83e04388513fa093.js","static/chunks/24-27d8cc2fc3f8a8d46976.js","static/chunks/771-602be6d7c2b06f988a8b.js","static/chunks/pages/questionPages/question_ec_subpage-5f2d01a44bb38b9300bb.js"],"/questionPages/question_summary_subpage":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/47-4b7a83e04388513fa093.js","static/chunks/pages/questionPages/question_summary_subpage-7de8eace809de3357016.js"],"/resources":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/pages/resources-bc4edc7827ca8f81fd7e.js"],"/upload/learning-pathways-upload":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/pages/upload/learning-pathways-upload-fa3bae3249868de07c8a.js"],"/upload/question-upload":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/pages/upload/question-upload-3de2c39e7a49aa88817a.js"],"/upload/resources-upload":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/pages/upload/resources-upload-19a2d82f59059a02bed7.js"],"/welcome":["static/chunks/webpack-a583fb553ee058da8701.js","static/chunks/framework-2191d16384373197bc0a.js","static/chunks/main-1e86c55e962a820f204c.js","static/chunks/cb1608f2-db9080bde6dc6de21be6.js","static/chunks/a9a7754c-3c1560eb8c2af1aeeda9.js","static/chunks/625-ea71c39ffe0705a48cb6.js","static/chunks/814-496de8360acaa2f6287d.js","static/chunks/869-d39729f2723c48fb01f9.js","static/css/17597d3694d41727ad30.css","static/chunks/pages/welcome-cb8a5d97099044314340.js"]},"ampFirstPages":[]}');

/***/ }),

/***/ 3978:
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ })

};
;