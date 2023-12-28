import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { TaskType } from "../../../types/TaskType";
import { db } from "../../../firebase-config/firebaseConfig";

export default async function deleteTaskDB(userID: string, task: TaskType) {
  const taskRef = doc(
    db,
    "users",
    userID,
    "task-lists",
    task.list,
    "tasks",
    task.taskID
  );
  await setDoc(taskRef, {});
  await deleteDoc(taskRef);
}
