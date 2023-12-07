import { SubtasksChangesType } from "../../types/TaskType";

export const editSubtask = (
  subtasks: SubtasksChangesType,
  setSubtasks: (subtasks: SubtasksChangesType) => void,
  propertyToChange: string,
  newValue: string | boolean,
  subtaskTitle: string
) => {
  setSubtasks(
    subtasks.map((subtask) => {
      if (subtask.title === subtaskTitle) {
        return {
          ...subtask,
          [propertyToChange]: newValue,
        };
      }
      return subtask;
    })
  );
};
