import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";

export default async function getNotesDB(userID: string) {
  return await getDoc(doc(db, "users", userID));
}
