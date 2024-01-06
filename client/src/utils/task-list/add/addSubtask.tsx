import { SubtaskType, Task, TaskLists } from "../../../context/tasksContext";

export default function addSubtask(
  taskLists: TaskLists,
  currentTask: Task,
  setCurrentTask: (task: Task) => void,
  newSubtask: SubtaskType
) {
  const listIndex = taskLists.findIndex(
    (list) => list.listName === currentTask.list
  );

  const updatedTaskLists = [...taskLists];

  const taskIndex = updatedTaskLists[listIndex].tasks.findIndex(
    (t) => t.taskID === currentTask.taskID
  );

  const updatedTask = { ...updatedTaskLists[listIndex].tasks[taskIndex] };

  updatedTask.subtasks = [...updatedTask.subtasks, newSubtask];

  setCurrentTask(updatedTask);
}
