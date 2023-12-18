import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";

export default async function addNewTaskDB(
  userID: string,
  listID: string,
  taskName: string,
  description: string,
  date: string,
  taskStatus: boolean
) {
  await setDoc(
    doc(db, "users", userID, "task-lists", listID, "tasks", taskName),
    {
      title: taskName,
      description: description,
      date: date,
      taskStatus: taskStatus,
    }
  );
}
