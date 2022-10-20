import { initializeApp, getApp } from "firebase/app";
import { getEnvVariable } from "src/config/getConfig";

const firebaseCreds = {
  apiKey: getEnvVariable("NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY"),
  authDomain: getEnvVariable("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: getEnvVariable("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  appId: getEnvVariable("NEXT_PUBLIC_FIREBASE_APP_ID"),
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
