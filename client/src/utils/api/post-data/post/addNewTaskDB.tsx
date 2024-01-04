import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { Task } from "../../../../context/tasksContext";

export default async function addNewTaskDB(userID: string, newTask: Task) {
  await setDoc(
    doc(
      db,
      "users",
      userID,
      "task-lists",
      newTask.list,
      "tasks",
      newTask.taskID
    ),
    {
      task_id: newTask.taskID,
      task_title: newTask.title,
      task_description: newTask.description,
      task_date: newTask.date,
      task_status: newTask.taskStatus,
      subtasks: newTask.subtasks.map((subtask) => {
        return {
          subtask_id: subtask.subtaskID,
          subtask_title: subtask.title,
          subtask_status: subtask.subtaskStatus,
          subtask_description:
            subtask.description !== undefined ? subtask.description : "",
        };
      }),
    }
  );
}
