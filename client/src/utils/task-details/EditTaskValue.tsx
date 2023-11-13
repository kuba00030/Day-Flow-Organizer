import {
  MainTaskChangesType,
  SubtaskType,
  SubtasksChangesType,
} from "../../types/TaskType";

export const editTaskValue = (
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

export const editSubtask = (
  subtasks: SubtasksChangesType,
  setSubtasks: (subtasks: SubtasksChangesType) => void,
  subtaskProperty: string,
  newValue: string | boolean,
  subtaskID: string
) => {
  // setSubtasks([...subtasks,subtasks[subtasks.findIndex()]])
  setSubtasks(
    subtasks.map((subtask) => {
      if (subtask.subtaskID === subtaskID) {
        return {
          ...subtask,
          [subtaskProperty]: newValue,
        };
      }
      return subtask;
    })
  );
};
