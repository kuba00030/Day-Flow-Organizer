import { Task } from "../../context/tasksContext";

export const editSubtask = (
  taskChanges: Task,
  setTaskChanges: (task: Task) => void,
  propertyToChange: string,
  newValue: string | boolean,
  subtaskID: string
) => {
  setTaskChanges({
    ...taskChanges,
    subtasks: taskChanges.subtasks.map((subtask) => {
      if (subtask.subtaskID === subtaskID) {
        return {
          ...subtask,
          [propertyToChange]: newValue,
        };
      }
      return subtask;
    }),
  });
};
