import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { TaskLists } from "../../../../context/tasksContext";


export default async function updateTaskListDB(
  userID: string,
  originLists: TaskLists,
  editedLists: TaskLists
) {
  originLists.forEach(async (list, index) => {
    if (
      list.listName !== editedLists[index].listName ||
      list.listColor !== editedLists[index].listColor ||
      list.listActive !== editedLists[index].listActive
    ) {
      await updateDoc(doc(db, "users", userID, "task-lists", list.listName), {
        list_name: editedLists[index].listName,
        list_color: editedLists[index].listColor,
        list_active: editedLists[index].listActive,
      });
    }
  });
}
