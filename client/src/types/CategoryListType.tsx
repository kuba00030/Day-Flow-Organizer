import { TaskType } from "./TaskType";

export type TaskListType = {
  category: string;
  color: string;
  tasks: TaskType[];
};
export type TaskListsType = TaskListType[];
