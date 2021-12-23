import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import createUser from "../create-user";
const firebaseCreds = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
const firebaseApp = initializeApp(firebaseCreds);
const firebaseAuth = getAuth(firebaseApp);
class AuthFunctions {
  static userId = firebaseAuth.currentUser.uid ?? null;
  static async signInEmail(email: string, password: string) {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        this.userId = res.user.uid;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  static async createUser(
    email: string,
    password: string,
    initUserObj: AccountInfo
  ) {
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => {
        const user = res.user;
        this.userId = user.uid;
        fetch("/api/create-user", {
          method: "POST",
          body: JSON.stringify({ ...initUserObj, userId: user.uid }),
        }).then(async (res) => {
          const resObj = await res.json();
          console.log(resObj);
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
  static async signOut() {
    await firebaseAuth.signOut().catch((err) => {
      Alert(err);
    });
  }
}

export default AuthFunctions;
