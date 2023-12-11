import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { SubtaskType, TaskType } from "../../../../types/TaskType";

export default async function updateTaskListDB(
  userID: string,
  oldListName: string,
  newListName: string,
  newColor: string,
  tasks: TaskType[]
) {
  const oldTaskListRef = doc(db, "users", userID, "task-lists", oldListName);
  const newTaskListRef = doc(db, "users", userID, "task-lists", newListName);
  await deleteDoc(oldTaskListRef);
  await setDoc(newTaskListRef, { category: newListName, color: newColor });
  tasks.forEach(async (task) => {
    await setDoc(
      doc(db, "users", userID, "task-lists", newListName, "tasks", task.title),
      {
        title: task.title,
        description: task.description,
        date: task.date,
        taskStatus: task.taskStatus,
      }
    );
    if (task.subtasks.length) {
      task.subtasks.forEach(async (subtask) => {
        await setDoc(
          doc(
            db,
            "users",
            userID,
            "task-lists",
            newListName,
            "tasks",
            task.title,
            "subtasks",
            subtask.title
          ),
          {
            title: subtask.title,
            description: subtask.description ? subtask.description : "",
            subtaskStatus: subtask.subtaskStatus,
          }
        );
      });
    }
  });
}
