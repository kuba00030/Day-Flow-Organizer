import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";
import { Task } from "../../../context/tasksContext";

export default async function deleteTaskDB(userID: string, task: Task) {
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
