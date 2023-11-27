import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase-config/firebaseConfig";

export default async function handleSignInWithProvider(provider: any) {
  try {
    const { user } = await signInWithPopup(auth, provider);
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {});
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }
}
