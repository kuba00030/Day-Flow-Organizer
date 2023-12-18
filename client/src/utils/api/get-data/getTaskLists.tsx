import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";
import { TaskType } from "../../../types/TaskType";
import { TaskListsType } from "../../../types/CategoryListType";

export default async function getTaskLists(
  userID: string,
  taskStatus: boolean
) {
  const taskLists: TaskListsType = [];
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
          list.data().list_id,
          "tasks"
        ),
        where("taskStatus", "==", taskStatus)
      )
    );

    if (taskListSnapshot.empty === true) {
      taskLists.push({
        listName: list.data().list_name,
        listColor: list.data().list_color,
        listID: list.data().list_id,
        listActive: list.data().list_active,
        tasks: [],
      });
    } else {
      const tasks: TaskType[] = [];
      // single task from a list
      for (const taskDoc of taskListSnapshot.docs) {
        const subtasksSnapshot = await getDocs(
          query(
            collection(
              db,
              "users",
              userID,
              "task-lists",
              list.data().list_id,
              "tasks",
              taskDoc.data().title,
              "subtasks"
            )
          )
        );
        if (subtasksSnapshot.empty === true) {
          tasks.push({
            date: taskDoc.data().date,
            description: taskDoc.data().description,
            title: taskDoc.data().title,
            taskStatus: taskDoc.data().taskStatus,
            list: list.data().list_name,
            listColor: list.data().list_color,
            subtasks: [],
          });
        } else {
          tasks.push({
            date: taskDoc.data().date,
            description: taskDoc.data().description,
            title: taskDoc.data().title,
            taskStatus: taskDoc.data().taskStatus,
            list: list.data().list_name,
            listColor: list.data().list_color,
            subtasks: subtasksSnapshot.docs.map((subtaskDoc) => {
              return {
                title: subtaskDoc.data().title,
                subtaskStatus: subtaskDoc.data().subtaskStatus,
                description:
                  subtaskDoc.data().description === ""
                    ? undefined
                    : subtaskDoc.data().description,
              };
            }),
          });
        }
      }
      taskLists.push({
        listName: list.data().list_name,
        listColor: list.data().list_color,
        listID: list.data().list_id,
        listActive: list.data().list_active,
        tasks: tasks,
      });
    }
  }
  return taskLists;
}
