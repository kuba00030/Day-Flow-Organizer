import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { Task } from "../../../../context/tasksContext";

export default async function markTaskDoneDB(
  userID: string,
  listName: string,
  taskID: string,
  task: Task
) {
  await setDoc(
    doc(db, "users", userID, "task-lists", listName, "tasks", taskID),
    { task_status: !task.taskStatus },
    { merge: true }
  );
}
