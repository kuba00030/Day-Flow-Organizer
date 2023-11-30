import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";

export default async function addNewSubtask(
  userID: string,
  listName: string,
  taskName: string,
  subtaskName: string,
  description?: string
) {
  await setDoc(
    doc(
      db,
      "users",
      userID,
      "task-lists",
      listName,
      "tasks",
      taskName,
      "subtasks",
      subtaskName
    ),
    {
      title: subtaskName,
      description: description ? description : "",
      subtaskStatus: false,
    }
  );
}
