import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";
import { Task, TaskLists } from "../../../context/tasksContext";

export default async function getTaskLists(
  userID: string,
  taskStatus: boolean
) {
  const taskLists: TaskLists = [];
  const taskListsRef = query(collection(db, "users", userID, "task-lists"));
  const taskListsSnapshot = await getDocs(taskListsRef);

  for (const list of taskListsSnapshot.docs) {
    const taskListSnapshot = await getDocs(
      query(
        collection(
          db,
          "users",
          userID,
          "task-lists",
          list.data().list_name,
          "tasks"
        ),
        where("task_status", "==", taskStatus)
      )
    );

    if (taskListSnapshot.empty === true) {
      taskLists.push({
        listName: list.data().list_name,
        listColor: list.data().list_color,
        listActive: list.data().list_active,
        tasks: [],
      });
    } else {
      const tasks: Task[] = [];
      // single task from a list
      for (const taskDoc of taskListSnapshot.docs) {
        tasks.push({
          taskID: taskDoc.data().task_id,
          date: taskDoc.data().task_date,
          description: taskDoc.data().task_description,
          title: taskDoc.data().task_title,
          taskStatus: taskDoc.data().task_status,
          list: list.data().list_name,
          listColor: list.data().list_color,
          subtasks: taskDoc.data().subtasks.map((subtask) => {
            return {
              subtaskID: subtask.subtask_id,
              title: subtask.subtask_title,
              subtaskStatus: subtask.subtask_status,
              description:
                subtask.subtask_description === ""
                  ? undefined
                  : subtask.subtask_description,
            };
          }),
        });
      }
      taskLists.push({
        listName: list.data().list_name,
        listColor: list.data().list_color,
        listActive: list.data().list_active,
        tasks: tasks,
      });
    }
  }
  return taskLists;
}
