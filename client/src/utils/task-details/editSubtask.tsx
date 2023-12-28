import { TaskType } from "../../types/TaskType";

export const editSubtask = (
  taskChanges: TaskType,
  setTaskChanges: (task: TaskType) => void,
  propertyToChange: string,
  newValue: string | boolean,
  subtaskTitle: string
) => {
  setTaskChanges({
    ...taskChanges,
    subtasks: taskChanges.subtasks.map((subtask) => {
      if (subtask.title === subtaskTitle) {
        return {
          ...subtask,
          [propertyToChange]: newValue,
        };
      }
      return subtask;
    }),
  });
};
