import { TaskLists } from "../../../../context/tasksContext";
import deleteTaskListDB from "../../delete-data/deleteTaskListDB";
import setTaskListDB from "../post/setTaskListDB";

export default async function updateTaskListDB(
  userID: string,
  originLists: TaskLists,
  editedLists: TaskLists
) {
  originLists.forEach(async (list, index) => {
    if (list.listActive !== editedLists[index].listActive) {
      await deleteTaskListDB(userID, originLists[index].listName).catch(
        (error) => {
          console.log(error);
        }
      );
    } else if (
      list.listName !== editedLists[index].listName ||
      list.listColor !== editedLists[index].listColor
    ) {
      await setTaskListDB(userID, editedLists[index]);
    }
  });
}
