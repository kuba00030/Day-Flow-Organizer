import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";

export default async function updateTaskListDB(
  userID: string,
  newListName: string,
  newColor: string
) {
  const taskListRef = doc(db, "users", userID, "task-lists", newListName);
  await updateDoc(taskListRef, { category: newListName, color: newColor });
}
