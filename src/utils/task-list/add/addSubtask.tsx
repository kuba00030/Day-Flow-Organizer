import { SubtaskType, Task } from "../../../context/tasksContext";

export default function addSubtask(
  currentTask: Task,
  setCurrentTask: (task: Task) => void,
  newSubtask: SubtaskType
) {
  const updatedTask = { ...currentTask };

  updatedTask.subtasks = [...updatedTask.subtasks, newSubtask];

  setCurrentTask(updatedTask);
}
