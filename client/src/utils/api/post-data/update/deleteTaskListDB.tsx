import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";

export default async function deleteTaskListDB(userID: string, listID: string) {
  const taskListData = doc(db, "users", userID, "task-lists", listID);
  const tasksCollection = await getDocs(
    query(collection(db, "users", userID, "task-lists", listID, "tasks"))
  );
  if (tasksCollection.empty === true) {
    await setDoc(taskListData, {});
    await deleteDoc(taskListData);
  } else {
    tasksCollection.forEach(async (task) => {
      const subtasksCollection = await getDocs(
        query(
          collection(
            db,
            "users",
            userID,
            "task-lists",
            listID,
            "tasks",
            task.data().title,
            "subtasks"
          )
        )
      );
      if (subtasksCollection.empty) {
        const taskData = doc(
          db,
          "users",
          userID,
          "task-lists",
          listID,
          "tasks",
          task.data().title
        );
        await setDoc(taskData, {});
        await deleteDoc(taskData);
      } else {
        const taskData = doc(
          db,
          "users",
          userID,
          "task-lists",
          listID,
          "tasks",
          task.data().title
        );
        subtasksCollection.forEach(async (subtask) => {
          const subtaskData = doc(
            db,
            "users",
            userID,
            "task-lists",
            listID,
            "tasks",
            task.data().title,
            "subtasks",
            subtask.data().title
          );
          await setDoc(subtaskData, {});
          await deleteDoc(subtaskData);
        });
        await deleteDoc(taskData);
      }
    });
    await setDoc(taskListData, {});
    await deleteDoc(taskListData);
  }
}
