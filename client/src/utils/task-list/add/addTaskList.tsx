import { TaskListsType } from "../../../types/CategoryListType";

export default function addTaskList(
  taskLists: TaskListsType,
  setTaskLists: (lists: TaskListsType) => void,
  listName: string,
  listColor: string
) {
  setTaskLists([
    ...taskLists,
    {
      listName: listName,
      listColor: listColor,
      tasks: [],
      listActive: true,
    },
  ]);
}
