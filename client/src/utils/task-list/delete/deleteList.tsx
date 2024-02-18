import { TaskLists } from "../../../context/tasksContext";

export default function deleteList(
  lists: TaskLists,
  setTaskLists: (lists: TaskLists) => void
) {
  setTaskLists(lists.filter((list) => list.listActive === true));
}
