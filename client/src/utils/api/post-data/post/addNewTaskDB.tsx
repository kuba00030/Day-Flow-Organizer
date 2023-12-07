import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";

export default async function addNewTaskDB(
  userID: string,
  listName: string,
  taskName: string,
  description: string,
  date: string
) {
  await setDoc(
    doc(db, "users", userID, "task-lists", listName, "tasks", taskName),
    {
      title: taskName,
      description: description,
      date: date,
      taskStatus: false,
    }
  );
}
