import { signOut } from "firebase/auth";
import { auth } from "../../../firebase-config/firebaseConfig";

export default async function signOutDB() {
  await signOut(auth);
}
