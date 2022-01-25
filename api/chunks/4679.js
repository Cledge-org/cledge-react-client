"use strict";
exports.id = 4679;
exports.ids = [4679];
exports.modules = {

/***/ 4679:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ECDropDown)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(887);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(799);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);





const defaultProps = {
  isConcatenable: false,
  title: "Achievements",
  placeholder: "Pick some tags...",
  forCalendar: false,
  valuesList: ["None"],
  key: "",
  questionTitle: "",
  onChange: () => {}
};

function useOutsideAlerter(ref, handleClickOutside) {
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function ECDropDown({
  isConcatenable,
  title,
  placeholder,
  forCalendar,
  defaultValue,
  valuesList,
  key,
  isForWaitlist,
  questionTitle,
  onChange
}) {
  const {
    0: chosen,
    1: setChosen
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)( //WORKS!!!
  isConcatenable && defaultValue instanceof Array ? defaultValue.map(element => " " + element) : "");
  const {
    0: isOpen,
    1: setIsOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  useOutsideAlerter(wrapperRef, event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  });

  const changeChosen = value => {
    setChosen(prevChosen => {
      if (!isConcatenable) {
        onChange(value);
        return value;
      }

      let prevChosenArr = prevChosen instanceof Array ? prevChosen.slice() : [];
      console.log(prevChosenArr);

      if (prevChosenArr.includes(" " + value)) {
        prevChosenArr.splice(prevChosen.indexOf(" " + value));
        onChange(prevChosenArr.map(element => element.substring(1)));
        return prevChosenArr;
      }

      prevChosenArr.push(" " + value);
      onChange(prevChosenArr.map(element => element.substring(1)));
      return prevChosenArr;
    });
  };

  const itemIsPicked = itemName => {
    if (isConcatenable) {
      return chosen.length === 0 ? defaultValue.includes(itemName) : chosen.includes(" " + itemName);
    }

    return chosen === "" || chosen === [] ? defaultValue === itemName : chosen === itemName;
  };

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    typeof document !== undefined ? __webpack_require__(9595) : null;
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: !forCalendar && !isForWaitlist ? "w-100 d-flex flex-column justify-content-evenly pt-5" : "w-100 d-flex flex-column justify-content-evenly",
    children: [!forCalendar && !isForWaitlist ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
      className: "fw-bold cl-dark-text pb-3",
      style: {
        fontSize: "1.4em"
      },
      children: questionTitle
    }) : null, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      ref: wrapperRef,
      className: "dropdown-container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
        className: `ec-dropdown-btn ${isForWaitlist ? "bg-white" : ""}`,
        onClick: () => setIsOpen(!isOpen),
        children: [!forCalendar && (defaultValue === "" || defaultValue === [] || !defaultValue) ? chosen.length === 0 ? placeholder : !isConcatenable ? chosen : chosen.toString() : chosen.length === 0 ? defaultValue instanceof Array ? defaultValue.reduce((prev, curr) => {
          return prev === "" ? curr : prev + ", " + curr;
        }, "") : defaultValue : chosen.toString(), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
          className: isOpen ? "center-child icon-open" : "center-child icon-close",
          style: {
            width: "12px",
            height: "10px"
          },
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_1__.FontAwesomeIcon, {
            icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__.faChevronDown
          })
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
        className: "dropdown-menu-custom ec-dropdown-menu",
        style: !forCalendar && !isForWaitlist ? {
          display: isOpen ? "flex" : "none"
        } : {
          width: "100%",
          display: isOpen ? "flex" : "none"
        },
        children: valuesList.map(name => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx("div", {
          onClick: () => {
            changeChosen(name);
          },
          className: itemIsPicked(name) ? !forCalendar ? "ec-dropdown-item-picked" : "ec-dropdown-item-picked center-child" : !forCalendar ? "ec-dropdown-item" : "ec-dropdown-item center-child",
          children: name
        }, name))
      })]
    })]
  });
}
ECDropDown.defaultProps = defaultProps;

/***/ })

};
;