import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAuth as getAdminAuth } from "firebase-admin/auth";
import { initializeApp as initializeAdminApp } from "firebase-admin/app";
import { firebaseAuth } from "src/pages/api/auth/firebase-auth";

const firebaseAdminAuth = getAdminAuth();
class AdminAuthFunctions {
  static async validateAdmin(idToken: string | undefined) {
    if (!idToken) {
      idToken = await getAuth().currentUser.getIdToken(true);
    }
    let uid;
    // Verify the ID token first
    const claims = await firebaseAdminAuth.verifyIdToken(idToken);
    if (claims.admin === true) {
      // Allow access to requested admin resource
      uid = claims.uid;
    } else {
      return false;
    }

    console.error(uid);
    // Lookup the user associated with the specified uid
    await firebaseAdminAuth.getUser(uid).then((userRecord) => {
      // Claims can be accessed on the user record
      console.log(userRecord.customClaims["admin"]);
    });
    return true;
  }

  static async setAdminPriviledge(isAdmin: boolean) {
    // Set admin priviledge
    let uid = firebaseAuth.currentUser.uid;
    await firebaseAdminAuth.setCustomUserClaims(uid, { admin: isAdmin });
  }
}

export default AdminAuthFunctions;
