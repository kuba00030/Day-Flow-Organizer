import { Task } from "../../context/tasksContext";

export const editTask = (
  task: Task,
  setEditedTask: (task: Task) => void,
  property: string,
  e: any
) => {
  setEditedTask({
    ...task,
    [property]: e.target.value,
  });
};
