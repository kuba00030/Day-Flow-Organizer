import {
  SubtaskType,
  Task,
  TaskList,
  TaskLists,
} from "../../../context/tasksContext";

export default function addSubtask(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
  currentList: TaskList,
  setCurrentList: (list: TaskList) => void,
  currentTask: Task,
  setCurrentTask: (task: Task) => void,
  newSubtask: SubtaskType
) {
  const listIndex = taskLists.findIndex(
    (list) => list.listName === currentList.listName
  );

  const updatedTaskLists = [...taskLists];

  const taskIndex = updatedTaskLists[listIndex].tasks.findIndex(
    (t) => t.taskID === currentTask.taskID
  );

  const updatedTask = { ...updatedTaskLists[listIndex].tasks[taskIndex] };

  updatedTask.subtasks = [...updatedTask.subtasks, newSubtask];

  updatedTaskLists[listIndex].tasks[taskIndex] = updatedTask;

  setTaskLists(updatedTaskLists);
  if (currentTask.list === currentList.listName) {
    setCurrentList(updatedTaskLists[listIndex]);
  }
  setCurrentTask(updatedTask);
}
