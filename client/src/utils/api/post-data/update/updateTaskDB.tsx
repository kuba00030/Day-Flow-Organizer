import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { TaskType } from "../../../../types/TaskType";

export default async function updateTaskDB(
  userID: string,
  listName: string,
  task: TaskType,
  taskTitle: string
) {
  const taskRef = doc(
    db,
    "users",
    userID,
    "task-lists",
    listName,
    "tasks",
    taskTitle
  );
  const subtaskRef = doc(
    db,
    "users",
    userID,
    "task-lists",
    listName,
    "tasks",
    taskTitle,
    "subtasks"
  );
  if (task.subtasks.length > 0) {
    await updateDoc(taskRef, {
      title: task.title,
      description: task.description,
      list: task.list,
      listColor: task.listColor,
      date: task.date,
      taskStatus: task.taskStatus,
    });
    await updateDoc(subtaskRef, []);
  } else {
    await updateDoc(taskRef, {
      title: task.title,
      description: task.description,
      list: task.list,
      listColor: task.listColor,
      date: task.date,
      taskStatus: task.taskStatus,
    });
  }
}
