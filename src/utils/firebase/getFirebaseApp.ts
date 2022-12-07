import { initializeApp, getApp } from "firebase/app";
import { getEnvVariable } from "src/config/getConfig";
const firebaseCreds = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export const getFirebaseClientApp = () => {
  let firebaseApp;
  try {
    firebaseApp = getApp();
  } catch (error) {
    firebaseApp = initializeApp(firebaseCreds);
  }
  return firebaseApp;
};
