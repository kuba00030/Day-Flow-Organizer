import { TaskType } from "./TaskType";

export type TasksContextType = {
  tasksList: TaskType[];
  setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
  taskDetails: TaskType;
  setTaskDetails: React.Dispatch<React.SetStateAction<TaskType>>;
  isTaskOpened: boolean;
  setIsTaskOpened: React.Dispatch<React.SetStateAction<boolean>>;
  changedTask: TaskType;
  setChangedTask: React.Dispatch<React.SetStateAction<TaskType>>;
};
