import { Task } from "../../context/tasksContext";

export const editSubtask = (
  taskChanges: Task,
  setTaskChanges: (task: Task) => void,
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
