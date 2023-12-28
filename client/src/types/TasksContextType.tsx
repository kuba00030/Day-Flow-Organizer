import { TaskType } from "./TaskType";
import { TaskListType, TaskListsType } from "./CategoryListType";

export type TasksContextType = {
  taskList: TaskListType;
  setTaskList: React.Dispatch<React.SetStateAction<TaskListType>>;
  taskDetails: TaskType;
  setTaskDetails: React.Dispatch<React.SetStateAction<TaskType>>;
  isTaskOpened: boolean;
  taskLists: TaskListsType;
  setTaskLists: React.Dispatch<React.SetStateAction<TaskListsType>>;
  setIsTaskOpened: React.Dispatch<React.SetStateAction<boolean>>;
  taskChanges: TaskType;
  setTaskChanges: React.Dispatch<React.SetStateAction<TaskType>>;
};
