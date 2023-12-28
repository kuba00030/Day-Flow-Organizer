import { TaskType } from "./TaskType";

export type TaskListType = {
  listName: string;
  listColor: string;
  listActive: boolean | string;
  tasks: TaskType[];
};
export type TaskListsType = TaskListType[];
