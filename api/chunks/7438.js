"use strict";
exports.id = 7438;
exports.ids = [7438];
exports.modules = {

/***/ 3020:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ FeatureCarousel)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react-slick"
var external_react_slick_ = __webpack_require__(9080);
var external_react_slick_default = /*#__PURE__*/__webpack_require__.n(external_react_slick_);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./components/common/FeatureCard.tsx




/* harmony default export */ const FeatureCard = (({
  title,
  description,
  image
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "container-fluid d-flex justify-content-evenly align-items-center mt-5 flex-wrap pb-3",
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "col-12 col-lg-4 pb-4 pb-lg-0",
      children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
        className: "mt-2  fw-bold cl-darktext ",
        children: title
      }), /*#__PURE__*/jsx_runtime_.jsx("h3", {
        className: "fw-light cl-mid-gray fs-5 ",
        children: description
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "pb-0 ps-0 pe-0 feature-card-img",
      style: {
        width: "fit-content",
        height: "fit-content"
      },
      children: /*#__PURE__*/jsx_runtime_.jsx(next_image.default, {
        src: image
      })
    })]
  });
});
;// CONCATENATED MODULE: ./public/images/landing_questions.png
/* harmony default export */ const landing_questions = ({"src":"/_next/static/image/public/images/landing_questions.64ce12063f03190f10c2768c5df14eac.png","height":536,"width":855,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAbElEQVR42k2MWwqFMBBDu/+NCkK5emtr55GMU78MhPOTnFLrH1MsVJySdLcwc7ojaVG2raIPCW2dMmaAjDGMqs6Vsu8/3LdEu5xqr4XtMgLL4iznOXKgMadlJQAEycW35Ti654CtGfKNfOGbB0vFnFRGgMqRAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./public/images/landing_video.png
/* harmony default export */ const landing_video = ({"src":"/_next/static/image/public/images/landing_video.dbeabed16d7eb9544ab63bf2b0ed7436.png","height":523,"width":845,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAiUlEQVR42i2KWwrCMBQFz2nSSCpuQHH/mxFxAYKx1o9iH0lpKgrNtRTnaxiGPnzEuStsYbE/HBEHD20Miu0Ol/MJmaSEun7J9P5KbjTKW4nQD8gN0bQ9tFKAosDdHcYxou0GeTY9uxDkUVVkCFOKcYT3LUiCxAKhtV59HazdLIGY50SlMiGJP/wBIpZEdayl1xQAAAAASUVORK5CYII="});
;// CONCATENATED MODULE: ./public/images/landing_chatbot.png
/* harmony default export */ const landing_chatbot = ({"src":"/_next/static/image/public/images/landing_chatbot.ac0536b82ae444d5f953878649cca975.png","height":576,"width":855,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAaUlEQVR42i2M2woDMQgF/f8P3ZeWsEvRxNuxJu3DIBzGoTE+WOpwd8y5qoGZISLgfem6XmBelZnVQzFLqRpUtayhXRBRRDjeY3ZBt3wKTdHzzCOgR/OsyDzCn6L7liO4/7L7KzPAYr0HvkEmnDkCc6NGAAAAAElFTkSuQmCC"});
;// CONCATENATED MODULE: ./public/images/landing_search_tool.png
/* harmony default export */ const landing_search_tool = ({"src":"/_next/static/image/public/images/landing_search_tool.9d7e9fc006e2cd7438bf8eb4dc7519b8.png","height":536,"width":855,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAoUlEQVR42iWNTQqCUAAGPWVHaNUJailEBLVoUbTvBAURnUHtB7KwEi01cvNMU7Fn35fVdhhmFCGezPOCgR/w4roUIqaIYpzOd2ZpQSUMBSqIrqqiWa9R1w40DAvDQQdSSvyEJMmwMrZYaxpt98a95WF39CDL91+IqmyvraLfanA6nXMyGmM5W+AlSyqu4yN6pDAtH+bhStvxuNF1HPfmd8EPW4iL3dwY9PgAAAAASUVORK5CYII="});
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(799);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(887);
;// CONCATENATED MODULE: ./components/common/FeatureCarousel.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














const settings = {
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  afterChange: function (index) {
    console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
  }
};
/* harmony default export */ const FeatureCarousel = (/*#__PURE__*/external_react_default().forwardRef((props, ref) => {
  const sliderRef = (0,external_react_.useRef)();

  const handleOnClick = index => {
    sliderRef.current.slickGoTo(index);
    props.setCurrPage(index);
  };

  (0,external_react_.useEffect)(() => {
    sliderRef.current.slickGoTo(props.currPage);
  }, [props.currPage]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    //WORKS!
    ref: ref,
    className: "pt-0 pt-md-4 pb-0",
    style: {
      backgroundColor: "#f5f5f5",
      height: "90vh"
    },
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "row",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "shadow-sm text-center col-12 col-md-11 col-lg-9 bg-white rounded-lg feature-tabbar mx-auto",
        children: [/*#__PURE__*/jsx_runtime_.jsx("h2", {
          className: "pt-3 fs-4 fw-bold",
          children: "Features"
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "row p-3 justify-content-evenly",
          children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "col-6 col-lg-3",
            children: /*#__PURE__*/jsx_runtime_.jsx(FeatureTab, {
              index: 0,
              curr: props.currPage,
              title: "Personalization Quizes",
              icon: free_solid_svg_icons_.faEdit,
              onClick: () => handleOnClick(0)
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "col-6 col-lg-3",
            children: /*#__PURE__*/jsx_runtime_.jsx(FeatureTab, {
              index: 1,
              curr: props.currPage,
              title: "Video Learning Pathway",
              icon: free_solid_svg_icons_.faChalkboardTeacher,
              onClick: () => handleOnClick(1)
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "col-6 col-lg-3",
            children: /*#__PURE__*/jsx_runtime_.jsx(FeatureTab, {
              index: 2,
              curr: props.currPage,
              title: "AI Counselor",
              icon: free_solid_svg_icons_.faComments,
              onClick: () => handleOnClick(2)
            })
          }), /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: "col-6 col-lg-3",
            children: /*#__PURE__*/jsx_runtime_.jsx(FeatureTab, {
              index: 3,
              curr: props.currPage,
              title: "College Search Tool",
              icon: free_solid_svg_icons_.faSearch,
              onClick: () => handleOnClick(3)
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)((external_react_slick_default()), _objectSpread(_objectSpread({
      className: "pb-0"
    }, settings), {}, {
      ref: sliderRef,
      children: [/*#__PURE__*/jsx_runtime_.jsx(FeatureCard, {
        title: "PERSONALIZATION QUIZZES",
        description: "Discover schools that match what’s important to you – location, majors, campus life, cost.",
        image: landing_questions
      }), /*#__PURE__*/jsx_runtime_.jsx(FeatureCard, {
        title: "VIDEO LEARNING PATHWAYS",
        description: "Every single student is unique in their interests and goals. Cledge looks to provide tailored learning experiences for every student that addresses these interests and goals.",
        image: landing_video
      }), /*#__PURE__*/jsx_runtime_.jsx(FeatureCard, {
        title: "AI COUNSELOR",
        description: "An AI assistant will answer questions and provide personalized guidance based on historical data.",
        image: landing_chatbot
      }), /*#__PURE__*/jsx_runtime_.jsx(FeatureCard, {
        title: "COLLEGE SEARCH TOOL",
        description: "Discover schools that match what’s important to you – location, majors, campus life, cost.",
        image: landing_search_tool
      })]
    }))]
  });
}));

const FeatureTab = ({
  icon,
  title,
  onClick,
  curr,
  index
}) => {
  const borderColor = curr == index ? "#2651ed" : "#f2f2f7";
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "feature-tab d-flex flex-column justify-content-between",
    onClick: e => onClick(),
    style: {
      borderColor: borderColor
    },
    children: [/*#__PURE__*/jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
      icon: icon,
      style: {
        height: "2.4em"
      },
      className: "cl-blue"
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      className: "pt-3 m-0 cl-darktext text-nowrap overflow-hidden",
      style: {
        fontSize: "0.9em"
      },
      children: title
    })]
  });
};

/***/ }),

/***/ 6011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1664);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(799);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2953);
/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);





function Footer({
  onFeatureClick
}) {
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("footer", {
    className: "bg-dark-blue cl-light-gray container-fluid px-6",
    style: {
      padding: 60,
      width: "100%"
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "row mt-2 cl-translucent-white",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "col-12 col-md-4",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(next_link__WEBPACK_IMPORTED_MODULE_0__.default, {
          href: "#",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h4", {
            className: "cl-white title",
            style: {
              fontWeight: 600,
              fontFamily: "Montserrat"
            },
            children: "cledge."
          })
        }), "support us at...", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
          className: "mt-3",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
            href: "https://www.linkedin.com/company/cledge/",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
              icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faLinkedin,
              className: "social-icon"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
            href: "https://www.facebook.com/cledge.org",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
              icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faFacebookSquare,
              className: "social-icon"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
            href: "https://www.instagram.com/hello.cledge/",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
              icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_2__.faInstagramSquare,
              className: "social-icon"
            })
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("br", {}), "\xA9 2021 Cledge"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "col-12 col-md-3 mx-auto mt-5 mt-md-0",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h6", {
          className: "title mb-4",
          children: "FEATURES"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("ul", {
          className: "list-unstyled",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: "mt-2",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
              onClick: () => {
                onFeatureClick(0);
              },
              className: "cl-white",
              children: "Personalized Quizzes"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: "mt-2",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
              onClick: () => {
                onFeatureClick(1);
              },
              className: "cl-white",
              children: "Video Learning Pathway"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: "mt-2",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
              onClick: () => {
                onFeatureClick(3);
              },
              className: "cl-white",
              children: "College Search"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("li", {
            className: "mt-2",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
              onClick: () => {
                onFeatureClick(2);
              },
              className: "cl-white",
              children: "AI Counselor"
            })
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "col-12 col-md-3  mt-5 mt-md-0",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("h6", {
          className: "title mb-4",
          children: "MORE"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("a", {
          href: "mailto:ayan@cledge.org",
          className: "cl-white",
          children: "Get in Touch"
        })]
      })]
    })
  });
}

/***/ }),

/***/ 5352:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _question_components_ec_dropdown_question__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4679);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const {
    0: waitlistForm,
    1: updateWaitlistForm
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    name: "",
    category: "Student",
    email: "",
    school: "",
    field: "General"
  });
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
    className: "row align-items-center justify-content-center m-0 bg-light-blue pt-5",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "text-center col-11 col-md-6 col-lg-4 p-3",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("h2", {
        children: "Join Our Waitlist"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "text-start",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("label", {
          style: {
            fontSize: "0.9em"
          },
          className: "text-muted",
          htmlFor: "name",
          children: "Name"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("input", {
          value: waitlistForm.name,
          onChange: e => updateWaitlistForm(_objectSpread(_objectSpread({}, waitlistForm), {}, {
            name: e.target.value
          })),
          type: "text",
          className: "px-3 form-control",
          id: "name",
          placeholder: "Enter Name"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "d-flex flex-row pt-3 pb-3 justify-content-between align-items-center",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
            className: "text-muted",
            style: {
              width: "20%",
              height: "100%"
            },
            children: "I AM A..."
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_question_components_ec_dropdown_question__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
            isForWaitlist: true,
            defaultValue: "Student",
            valuesList: ["Student", "Parent", "Educator", "Other"],
            onChange: value => {
              updateWaitlistForm(_objectSpread(_objectSpread({}, waitlistForm), {}, {
                category: value
              }));
            }
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("label", {
          style: {
            fontSize: "0.9em"
          },
          className: "text-muted",
          htmlFor: "email",
          children: "Email address"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("input", {
          value: waitlistForm.email,
          onChange: e => updateWaitlistForm(_objectSpread(_objectSpread({}, waitlistForm), {}, {
            email: e.target.value
          })),
          type: "email",
          className: "px-3 form-control mb-3",
          id: "email",
          placeholder: "Enter email"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("label", {
          style: {
            fontSize: "0.9em"
          },
          className: "text-muted",
          htmlFor: "school",
          children: "High School Name"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("input", {
          value: waitlistForm.school,
          onChange: e => updateWaitlistForm(_objectSpread(_objectSpread({}, waitlistForm), {}, {
            school: e.target.value
          })),
          type: "text",
          className: "px-3 form-control mb-3",
          id: "school",
          placeholder: "Enter school"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "d-flex flex-row justify-content-between align-items-center pt-4 pb-5",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
            className: "text-muted ",
            children: "I AM INTERESTED IN STUDYING..."
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_question_components_ec_dropdown_question__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
            isForWaitlist: true,
            defaultValue: "General",
            valuesList: ["General", "Arts", "Engineering", "Medical/Public Health", "Computer Science", "Business", "Law", "Others"],
            onChange: value => {
              updateWaitlistForm(_objectSpread(_objectSpread({}, waitlistForm), {}, {
                field: value
              }));
            }
          })]
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("button", {
        className: "cl-btn-blue text-white fs-5 fw-bold",
        children: "Submit Form"
      })]
    })
  });
});

/***/ }),

/***/ 2305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/image/public/images/landing_msft.c13dd9605b994c3049fb4b42e76a4d64.svg","height":72,"width":390});

/***/ }),

/***/ 2466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/image/public/images/landing_openai.0ad81468f55ef9584908dfd1d81eeda9.svg","height":82,"width":185});

/***/ })

};
;