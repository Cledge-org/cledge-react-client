import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  UserCredential,
} from "firebase/auth";
import { createUser } from "src/pages/api/user/create-user";
import { getFirebaseClientApp } from "src/utils/firebase/getFirebaseApp";
// import { getAuth as getAdminAuth } from "firebase-admin/auth";
// import {
//   getApp,
//   initializeApp as initializeAdminApp,
// } from "firebase-admin/app";

// const getAdminApp = (appName?: string) => {
//   try {
//     return getApp(appName);
//   } catch (err) {
//     return undefined;
//   }
// };
// console.error(firebaseCreds);

const firebaseAuth = getAuth(getFirebaseClientApp());
// const firebaseAdminAuth = getAdminAuth(
//   getAdminApp(firebaseApp.name) ?? initializeAdminApp(firebaseCreds)
// );
// const provider = new GoogleAuthProvider();
class AuthFunctions {
  static async signInEmail(email: string, password: string) {
    try {
      let user = await setPersistence(
        firebaseAuth,
        browserLocalPersistence
      ).then(() => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
      });
      let idToken = await user.user.getIdToken();
      //await this.validateAdmin(idToken);
      return user.user;
    } catch (err) {
      console.error(err);
    }
  }
  static async createUser(email: string, password: string, initUserObj) {
    let returnedUser: UserCredential = null;
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        returnedUser = res;
        const user = res.user;
        createUser({
          ...initUserObj,
          firebaseId: user.uid,
          email: email,
          referralCode: user.uid.substring(0, 6).toUpperCase() + user.uid.at(user.uid.length - 1)
        }).catch((err) => {
          console.error(err);
        });
      })
      .catch((err) => {
        console.error(err);
      });
    return returnedUser;
  }

  // static async signInGoogle() {
  //   await firebaseAuth
  //     .signInWithPopup(firebaseAuth.getAuth(), this.googleProvider)
  //     .catch((err) => {
  //       Alert(err);
  //     });
  // }
  static async resetPassword(email: string) {
    await sendPasswordResetEmail(firebaseAuth, email);
  }
  static async signOut() {
    await firebaseAuth.signOut().catch((err) => {
      console.error(err);
    });
  }
  // static async validateAdmin(idToken: string | undefined) {
  //   if (!idToken) {
  //     idToken = await getAuth().currentUser.getIdToken(true);
  //   }
  //   let uid;
  //   // Verify the ID token first
  //   const claims = await firebaseAdminAuth.verifyIdToken(idToken);
  //   if (claims.admin === true) {
  //     // Allow access to requested admin resource
  //     uid = claims.uid;
  //   } else {
  //     return false;
  //   }

  //   console.error(uid);
  //   // Lookup the user associated with the specified uid
  //   await firebaseAdminAuth.getUser(uid).then((userRecord) => {
  //     // Claims can be accessed on the user record
  //     console.log(userRecord.customClaims["admin"]);
  //   });
  //   return true;
  // }

  // static async setAdminPriviledge(isAdmin: boolean) {
  //   // Set admin priviledge
  //   let uid = firebaseAuth.currentUser.uid;
  //   await firebaseAdminAuth.setCustomUserClaims(uid, { admin: isAdmin });
  // }
}

export default AuthFunctions;
