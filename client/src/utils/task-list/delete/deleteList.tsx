import { TaskList, TaskLists } from "../../../context/tasksContext";

export default function deleteList(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
  setCurrentList: (list: TaskList) => void
) {
  let editedLists = taskLists;

  editedLists = editedLists.filter((list) => list.listActive === true);

  setTaskLists(editedLists);

  setCurrentList(editedLists[0]);
}
