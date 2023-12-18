import { TaskListsType } from "../../types/CategoryListType";

export default function addTaskList(
  taskLists: TaskListsType,
  setTaskLists: (lists: TaskListsType) => void,
  listName: string,
  listColor: string,
  listID: number
) {
  setTaskLists([
    ...taskLists,
    {
      listName: listName,
      listColor: listColor,
      listID: `${listID + listName}`,
      tasks: [],
    },
  ]);
}
