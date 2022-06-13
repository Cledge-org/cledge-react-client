import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import  AdminAuth  from "firebase-admin/auth";

const firebaseCreds = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const firebaseApp = initializeApp(firebaseCreds);
const firebaseAuth = getAuth(firebaseApp);
const firebaseAdminAuth = AdminAuth.getAuth(firebaseApp);
class AuthFunctions {
  static async validateAdmin(idToken: string | undefined) {
    if (!idToken) {
      idToken = await getAuth().currentUser.getIdToken(true);
    }
    let uid;
    // Verify the ID token first
    await firebaseAdminAuth.verifyIdToken(idToken).then((claims) => {
      if (claims.admin === true) {
        // Allow access to requested admin resource
        uid = claims.uid;
      } else {
        return false;
      }
    })

    // Lookup the user associated with the specified uid
    await firebaseAdminAuth.getUser(uid).then((userRecord) => {
      // Claims can be accessed on the user record
      console.log(userRecord.customClaims['admin']);
    })   
    return true;
  }

  static async setAdminPriviledge(isAdmin: boolean) {
    // Set admin priviledge
    let uid = firebaseAuth.currentUser.uid;
    await firebaseAdminAuth.setCustomUserClaims(uid, { admin: isAdmin })
  }
}

export default AuthFunctions;

