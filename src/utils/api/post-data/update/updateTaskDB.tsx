import deleteTaskDB from "../../delete-data/deleteTaskDB";
import setTaskDB from "../post/setTaskDB";
import { Task } from "../../../../context/tasksContext";

export default async function updateTaskDB(
  userID: string,
  originTask: Task,
  editedTask: Task
) {
  if (originTask.list === editedTask.list) {
    await setTaskDB(userID, editedTask);
  } else {
    // delete origin task from origin task list
    await deleteTaskDB(userID, originTask);
    // push edited task to new selected list
    await setTaskDB(userID, editedTask);
  }
}
