import { Task, TaskList, TaskLists } from "../../../context/tasksContext";

export default function addTask(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
  currentList: TaskList,
  setCurrentList: (list: TaskList) => void,
  newTask: Task
) {
  const taskToAdd = newTask;

  taskToAdd.subtasks = newTask.subtasks.filter(
    (subtask) => subtask.title !== ""
  );

  const updatedTaskLists = [...taskLists];

  const listIndex = updatedTaskLists.findIndex(
    (list) => list.listName === newTask.list
  );

  updatedTaskLists[listIndex] = {
    ...updatedTaskLists[listIndex],
    tasks: [taskToAdd, ...updatedTaskLists[listIndex].tasks],
  };

  setTaskLists(updatedTaskLists);
  if (
    taskToAdd.list === currentList.listName ||
    currentList.listName === "Upcoming" ||
    currentList.listName === "Today"
  ) {
    setCurrentList({
      ...currentList,
      tasks: [taskToAdd, ...currentList.tasks],
    });
  }
}
