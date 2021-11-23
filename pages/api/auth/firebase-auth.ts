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
  static googleProvider = new GoogleAuthProvider();
  static initFirebaseProj() {
    if (!firebase.getApps().length) {
      firebase.initializeApp(firebaseCreds);
    }
    this.googleProvider.addScope(
      "https://www.googleapis.com/auth/contacts.readonly"
    );
  }
  static async signInEmail(email: string, password: string) {
    await firebaseAuth
      .signInWithEmailAndPassword(firebaseAuth.getAuth(), email, password)
      .catch((err) => {
        Alert(err);
      });
  }
  static async signInGoogle() {
    await firebaseAuth
      .signInWithPopup(firebaseAuth.getAuth(), this.googleProvider)
      .catch((err) => {
        Alert(err);
      });
  }
  static async signOut() {
    await firebaseAuth.signOut(firebaseAuth.getAuth()).catch((err) => {
      Alert(err);
    });
  }
}
export const useFirebaseAuth = () => {
  const [currUser, setCurrUser] = useState(null);
  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged(
      firebaseAuth.getAuth(),
      async (authState) => {
        setCurrUser(authState);
      }
    );
    return () => unsub();
  }, []);
  return currUser;
};
AuthFunctions.initFirebaseProj();
export default AuthFunctions;
