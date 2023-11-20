import { RefObject } from "react";
import { MainTaskChangesType, SubtasksChangesType, TaskType } from "./TaskType";
import { CategoryListType } from "./CategoryListType";

export type TasksContextType = {
  tasksList: TaskType[];
  setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
  taskDetails: TaskType;
  setTaskDetails: React.Dispatch<React.SetStateAction<TaskType>>;
  isTaskOpened: boolean;
  categoryList: CategoryListType;
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryListType>>;
  setIsTaskOpened: React.Dispatch<React.SetStateAction<boolean>>;
  mainTaskChanges: MainTaskChangesType;
  setMainTaskChanges: React.Dispatch<React.SetStateAction<MainTaskChangesType>>;
  subTasksChanges: SubtasksChangesType;
  setSubtasksChanges: React.Dispatch<React.SetStateAction<SubtasksChangesType>>;
};
