import { RefObject } from "react";
import { MainTaskChangesType, SubtasksChangesType, TaskType } from "./TaskType";

export type TasksContextType = {
  tasksList: TaskType[];
  setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
  taskDetails: TaskType;
  setTaskDetails: React.Dispatch<React.SetStateAction<TaskType>>;
  isTaskOpened: boolean;
  categoryList: string[];
  setCategoryList: React.Dispatch<React.SetStateAction<string[]>>;
  setIsTaskOpened: React.Dispatch<React.SetStateAction<boolean>>;
  mainTaskChanges: MainTaskChangesType;
  setMainTaskChanges: React.Dispatch<React.SetStateAction<MainTaskChangesType>>;
  subTasksChanges: SubtasksChangesType;
  setSubtasksChanges: React.Dispatch<React.SetStateAction<SubtasksChangesType>>;
};
