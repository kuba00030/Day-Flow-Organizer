import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../firebase-config/firebaseConfig";

export default async function getCategoryList(userID: string) {
  const taskLists = [];
  const taskListsRef = query(collection(db, "users", userID, "task-lists"));

  const listsSnapshot = await getDocs(taskListsRef);

  for (const list of listsSnapshot.docs) {
    const tasksRef = collection(
      db,
      "users",
      userID,
      "task-lists",
      list.data().category,
      "tasks"
    );

    const tasksSnapshot = await getDocs(tasksRef);
    if (tasksSnapshot.empty === true) {
      taskLists.push({
        category: list.data().category,
        color: list.data().color,
        numberOfTasks: 0,
      });
    } else {
      taskLists.push({
        category: list.data().category,
        color: list.data().color,
        numberOfTasks: 0,
      });
    }
  }

  return taskLists;
}
