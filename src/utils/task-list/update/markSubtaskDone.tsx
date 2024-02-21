import { SubtaskType, Task } from "../../../context/tasksContext";

export default function markSubtaskDone(
  task: Task,
  setTask: (task: Task) => void,
  index: number
) {
  const editedSubtasks: SubtaskType[] = task.subtasks;

  editedSubtasks[index].subtaskStatus = !editedSubtasks[index].subtaskStatus;

  setTask({ ...task, subtasks: [...editedSubtasks] });
}
