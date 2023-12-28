import { TaskType } from "../../types/TaskType";

export const editTask = (
  task: TaskType,
  setEditedTask: (task: TaskType) => void,
  property: string,
  e: any
) => {
  setEditedTask({
    ...task,
    [property]: e.target.value,
  });
};
