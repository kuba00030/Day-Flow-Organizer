import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase-config/firebaseConfig";

export default async function handleSignInWithPasswordDB(
  email: string,
  password: string
) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });
}
