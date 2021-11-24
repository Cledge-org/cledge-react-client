import firebase from "firebase/app";
import firebaseAuth, { GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
const firebaseCreds = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
class AuthFunctions {
  static initFirebaseProj() {
    if (!firebase.getApps().length) {
      return firebase.initializeApp(firebaseCreds);
    }
    return null;
  }
  static async signInEmail(email: string, password: string) {
    console.log(email);
    console.log(password);
    return await firebaseAuth
      .signInWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
      .catch((err) => {
        console.error(err);
      });
  }
  static async createUser() {}
  // static async signInGoogle() {
  //   await firebaseAuth
  //     .signInWithPopup(firebaseAuth.getAuth(), this.googleProvider)
  //     .catch((err) => {
  //       Alert(err);
  //     });
  // }
  static async signOut() {
    await firebaseAuth.signOut(firebaseAuth.getAuth()).catch((err) => {
      Alert(err);
    });
  }
}

export default AuthFunctions;
