import { TaskLists } from "../../../context/tasksContext";

export default function addTaskList(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
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
