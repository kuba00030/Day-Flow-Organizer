import { TaskListType, TaskListsType } from "../../../types/CategoryListType";
import { TaskType } from "../../../types/TaskType";

export default function deleteTask(
  taskLists: TaskListsType,
  setTaskLists: (lists: TaskListsType) => void,
  taskToDel: TaskType
) {
  const updatedLists = [...taskLists];

  const listIndex = taskLists.findIndex(
    (list) => list.listName === taskToDel.list
  );

  const taskIndex = taskLists[listIndex].tasks.findIndex(
    (task) => task.taskID === taskToDel.taskID
  );

  updatedLists[listIndex].tasks.splice(taskIndex, 1);

  setTaskLists(updatedLists);
}
