import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase-config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default async function signUpWithEmailAndPassword(
  email: string,
  password: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {});
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
