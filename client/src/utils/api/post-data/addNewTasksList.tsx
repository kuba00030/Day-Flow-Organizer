import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";
import "firebase/firestore";
export default async function addNewtasksList(
  listName: string,
  listColor: string,
  userID: string
) {
  await setDoc(doc(db, "users", userID, "task-lists", listName), {
    category: listName,
    color: listColor,
  });
}
