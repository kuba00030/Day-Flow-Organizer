import { MainTaskChangesType, SubtasksChangesType, TaskType } from "./TaskType";
import { TaskListType, TaskListsType } from "./CategoryListType";

export type TasksContextType = {
  taskList: TaskListType;
  setTaskList: React.Dispatch<React.SetStateAction<TaskListType>>;
  taskDetails: TaskType;
  setTaskDetails: React.Dispatch<React.SetStateAction<TaskType>>;
  isTaskOpened: boolean;
  categoryList: TaskListsType;
  setCategoryList: React.Dispatch<React.SetStateAction<TaskListsType>>;
  setIsTaskOpened: React.Dispatch<React.SetStateAction<boolean>>;
  mainTaskChanges: MainTaskChangesType;
  setMainTaskChanges: React.Dispatch<React.SetStateAction<MainTaskChangesType>>;
  subTasksChanges: SubtasksChangesType;
  setSubtasksChanges: React.Dispatch<React.SetStateAction<SubtasksChangesType>>;
};
