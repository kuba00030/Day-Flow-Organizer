import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config/firebaseConfig";
import { TaskListsType } from "../../../../types/CategoryListType";

export default async function updateTaskListDB(
  userID: string,
  originLists: TaskListsType,
  editedLists: TaskListsType
) {
  originLists.forEach(async (list, index) => {
    if (
      list.listName !== editedLists[index].listName ||
      list.listColor !== editedLists[index].listColor ||
      list.listActive !== editedLists[index].listActive
    ) {
      await updateDoc(doc(db, "users", userID, "task-lists", list.listID), {
        list_name: editedLists[index].listName,
        list_color: editedLists[index].listColor,
        list_active: editedLists[index].listActive,
      });
    }
  });
}
