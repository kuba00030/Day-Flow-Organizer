import { SubtaskType, Task } from "../../../context/tasksContext";

export const editSubtask = (
  task: Task,
  setTask: (task: Task) => void,
  editedSubtask: SubtaskType
) => {
  let editedSubtasks = [...task.subtasks];

  const subtaskIndex = task.subtasks.findIndex(
    (subtask) => subtask.subtaskID === editedSubtask.subtaskID
  );

  editedSubtasks[subtaskIndex] = editedSubtask;

  setTask({ ...task, subtasks: editedSubtasks });
};
