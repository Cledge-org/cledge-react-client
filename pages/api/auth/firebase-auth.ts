import { initializeApp } from "firebase/app";
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
} from "firebase/auth";
import { useEffect, useState } from "react";
const firebaseCreds = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};
const firebaseApp = initializeApp(firebaseCreds);
const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
onAuthStateChanged(firebaseAuth, (user) => {
  console.log(user?.uid);
  AuthFunctions.userId = user?.uid;
});
class AuthFunctions {
  static userId = firebaseAuth.currentUser?.uid;
  static async signInEmail(email: string, password: string) {
    try {
      let user = await setPersistence(
        firebaseAuth,
        browserLocalPersistence
      ).then(() => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
      });
      this.userId = user.user.uid;
      return user.user;
    } catch (err) {
      console.error(err);
    }
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
  static async signOut() {
    await firebaseAuth.signOut().catch((err) => {
      console.error(err);
    });
  }
}

export default AuthFunctions;
