import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { TaskType } from "../../../../types/TaskType";
import deleteTaskDB from "../../delete-data/deleteTaskDB";
import addNewTaskDB from "../post/addNewTaskDB";

export default async function updateTaskDB(
  userID: string,
  originTask: TaskType,
  editedTask: TaskType
) {
  const taskRef = doc(
    db,
    "users",
    userID,
    "task-lists",
    editedTask.list,
    "tasks",
    editedTask.taskID
  );

  if (originTask.list === editedTask.list) {
    await updateDoc(taskRef, {
      task_date: editedTask.date,
      task_description: editedTask.description,
      task_id: editedTask.taskID,
      task_status: editedTask.taskStatus,
      task_title: editedTask.title,
      subtasks: editedTask.subtasks.map((subtask) => {
        return {
          subtask_id: subtask.subtaskID,
          subtask_title: subtask.title,
          subtask_status: subtask.subtaskStatus,
          subtask_description:
            subtask.description !== undefined ? subtask.description : "",
        };
      }),
    });
  } else {
    // delete origin task from origin task list
    await deleteTaskDB(userID, originTask);
    // push edited task to new selected list
    await addNewTaskDB(userID, editedTask);
  }
}
