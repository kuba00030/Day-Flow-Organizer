import { MainTaskChangesType } from "../../types/TaskType";

export const editTask = (
  task: MainTaskChangesType,
  setEditedTask: (task: MainTaskChangesType) => void,
  property: string,
  e: any
) => {
  setEditedTask({
    ...task,
    [property]: e.target.value,
  });
};
