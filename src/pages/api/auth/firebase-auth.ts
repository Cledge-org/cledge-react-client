import { initializeApp } from "firebase/app";
import AdminAuth from "src/pages/api/auth/user-and-token-auth";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  getIdTokenResult,
} from "firebase/auth";
import { useEffect, useState } from "react";

const firebaseCreds = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
// console.error(firebaseCreds);
export const firebaseApp = initializeApp(firebaseCreds);
export const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
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
      await AdminAuth.validateAdmin(idToken);
      return user.user;
    } catch (err) {
      console.error(err);
    }
  }
  static async createUser(email: string, password: string, initUserObj) {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        const user = res.user;
        fetch("/api/create-user", {
          method: "POST",
          body: JSON.stringify({
            ...initUserObj,
            userId: user.uid,
            email: email,
          }),
        }).then(async (res) => {
          console.log(res.status);
        });
      })
      .catch((err) => {
        console.error(err);
      });
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
}

export default AuthFunctions;
