"use strict";
exports.id = 5487;
exports.ids = [5487];
exports.modules = {

/***/ 5487:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9421);
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5942);
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_1__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const firebaseCreds = {
  apiKey: "AIzaSyDIWezBqFoahyxyMGCAg8VPujjUf1FVZbU",
  authDomain: "cledge-dev.firebaseapp.com",
  projectId: "cledge-dev"
};
const firebaseApp = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseCreds);
const firebaseAuth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(firebaseApp);
const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthProvider();

class AuthFunctions {
  static async signInEmail(email, password) {
    try {
      let user = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.setPersistence)(firebaseAuth, firebase_auth__WEBPACK_IMPORTED_MODULE_1__.browserLocalPersistence).then(() => {
        return (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(firebaseAuth, email, password);
      });
      console.error(user.user.uid);
      return user.user;
    } catch (err) {
      console.error(err);
    }
  }

  static async createUser(email, password, initUserObj) {
    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(firebaseAuth, email, password).then(res => {
      const user = res.user;
      fetch("/api/create-user", {
        method: "POST",
        body: JSON.stringify(_objectSpread(_objectSpread({}, initUserObj), {}, {
          userId: user.uid,
          email: email
        }))
      }).then(async res => {
        console.log(res.status);
      });
    }).catch(err => {
      console.error(err);
    });
  } // static async signInGoogle() {
  //   await firebaseAuth
  //     .signInWithPopup(firebaseAuth.getAuth(), this.googleProvider)
  //     .catch((err) => {
  //       Alert(err);
  //     });
  // }


  static async resetPassword(email) {
    await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.sendPasswordResetEmail)(firebaseAuth, email);
  }

  static async signOut() {
    await firebaseAuth.signOut().catch(err => {
      console.error(err);
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthFunctions);

/***/ })

};
;