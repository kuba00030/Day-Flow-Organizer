import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { Task } from "../../../../context/tasksContext";

export default async function setTaskDB(userID: string, givenTask: Task) {
  await setDoc(
    doc(
      db,
      "users",
      userID,
      "task-lists",
      givenTask.list,
      "tasks",
      givenTask.taskID
    ),
    {
      task_id: givenTask.taskID,
      task_title: givenTask.title,
      task_description: givenTask.description,
      task_starting_date: givenTask.start,
      task_end_date: givenTask.end,
      task_status: givenTask.taskStatus,
      subtasks: givenTask.subtasks.map((subtask) => {
        if (subtask.title !== "") {
          return {
            subtask_id: subtask.subtaskID,
            subtask_title: subtask.title,
            subtask_status: subtask.subtaskStatus,
            subtask_description:
              subtask.description !== undefined ? subtask.description : "",
          };
        }
      }),
    },
    { merge: true }
  );
}
