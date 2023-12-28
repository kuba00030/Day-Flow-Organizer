import { TaskListType, TaskListsType } from "../../../types/CategoryListType";
import { TaskType } from "../../../types/TaskType";

export default function addTask(
  taskLists: TaskListsType,
  setTaskLists: (lists: TaskListsType) => void,
  taskList: TaskListType,
  setTaskList: (list: TaskListType) => void,
  newTask: TaskType
) {
  const updatedTaskLists = [...taskLists];
  const listIndex = updatedTaskLists.findIndex(
    (list) => list.listName === newTask.list
  );
  updatedTaskLists[listIndex] = {
    ...updatedTaskLists[listIndex],
    tasks: [newTask, ...updatedTaskLists[listIndex].tasks],
  };
  setTaskLists(updatedTaskLists);
  if (newTask.list === taskList.listName) {
    // also add to currently deisplayed list
    setTaskList({ ...taskList, tasks: [newTask, ...taskList.tasks] });
  }
}
