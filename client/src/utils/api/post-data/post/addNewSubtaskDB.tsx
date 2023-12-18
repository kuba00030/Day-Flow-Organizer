import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";

export default async function addNewSubtaskDB(
  userID: string,
  listID: string,
  taskTitle: string,
  subtaskTitle: string,
  subtaskStatus: boolean,
  description?: string
) {
  await setDoc(
    doc(
      db,
      "users",
      userID,
      "task-lists",
      listID,
      "tasks",
      taskTitle,
      "subtasks",
      subtaskTitle
    ),
    {
      title: subtaskTitle,
      description: description ? description : "",
      subtaskStatus: subtaskStatus,
    }
  );
}
