import { Task, TaskList, TaskLists } from "../../../context/tasksContext";

export default function addTask(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
  taskList: TaskList,
  setTaskList: (list: TaskList) => void,
  newTask: Task
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
