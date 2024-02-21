import { SubtaskType, Task } from "../../../context/tasksContext";

export default function deleteSubtask(
  task: Task,
  setTask: (task: Task) => void,
  editedSubtask: SubtaskType
) {
  let editedSubtasks = [...task.subtasks];

  const subtaskIndex = task.subtasks.findIndex(
    (subtask) => subtask.subtaskID === editedSubtask.subtaskID
  );

  editedSubtasks.splice(subtaskIndex, 1);

  setTask({ ...task, subtasks: editedSubtasks });
}
