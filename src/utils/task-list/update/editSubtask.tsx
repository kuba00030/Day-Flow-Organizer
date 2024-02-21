import { SubtaskType, Task } from "../../../context/tasksContext";

export const editSubtask = (
  currentTask: Task,
  setTask: (task: Task) => void,
  editedSubtask: SubtaskType
) => {
  let editedSubtasks = [...currentTask.subtasks];

  const subtaskIndex = currentTask.subtasks.findIndex(
    (subtask) => subtask.subtaskID === editedSubtask.subtaskID
  );

  if (currentTask.subtasks[subtaskIndex]) {
    editedSubtasks[subtaskIndex] = editedSubtask;
  } else {
    editedSubtasks = [editedSubtask, ...editedSubtasks];
  }

  setTask({ ...currentTask, subtasks: editedSubtasks });
};
