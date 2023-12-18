import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import "firebase/firestore";
export default async function addTaskListDB(
  listName: string,
  listColor: string,
  userID: string,
  listID: string
) {
  await setDoc(doc(db, "users", userID, "task-lists", listID), {
    list_name: listName,
    list_id: listID,
    list_color: listColor,
    list_active: true,
  });
}
