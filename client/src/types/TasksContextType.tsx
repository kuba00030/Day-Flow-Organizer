import { MainTaskChangesType, SubtasksChangesType, TaskType } from "./TaskType";
import { TaskListsType } from "./CategoryListType";

export type TasksContextType = {
  taskList: TaskType[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>;
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
