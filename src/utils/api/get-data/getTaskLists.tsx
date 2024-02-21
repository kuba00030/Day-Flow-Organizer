import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";
import { Task, TaskLists } from "../../../context/tasksContext";

export default async function getTaskLists(userID: string) {
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
        )
      )
    );

    if (taskListSnapshot.empty === true) {
      taskLists.push({
        listName: list.data().list_name,
        listColor: list.data().list_color,
        listActive: true,
        tasks: [],
      });
    } else {
      const tasks: Task[] = [];
      // single task from a list
      for (const taskDoc of taskListSnapshot.docs) {
        tasks.push({
          taskID: taskDoc.data().task_id,
          start: taskDoc.data().task_starting_date,
          end: taskDoc.data().task_end_date,
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
              description: subtask.subtask_description,
            };
          }),
        });
      }
      taskLists.push({
        listName: list.data().list_name,
        listColor: list.data().list_color,
        listActive: true,
        tasks: tasks,
      });
    }
  }
  return taskLists;
}
