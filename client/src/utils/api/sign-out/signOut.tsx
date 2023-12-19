import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config/firebaseConfig";

export default async function signOutDB() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}
