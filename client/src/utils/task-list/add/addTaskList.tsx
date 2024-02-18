import { newList } from "../../../components/modal/add-list/AddNewListModalContent";
import { TaskLists } from "../../../context/tasksContext";

export default function addTaskList(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
  newList: newList
) {
  setTaskLists([
    ...taskLists,
    {
      listName: newList.listName,
      listColor: newList.listColor,
      tasks: [],
      listActive: true,
    },
  ]);
}
