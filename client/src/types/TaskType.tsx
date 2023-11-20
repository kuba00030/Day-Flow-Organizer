export type SubtaskType = {
  subtaskID: string;
  title: string;
  subtaskStatus: boolean;
  description?: string;
};
export type TaskType = {
  taskID: string;
  title: string;
  description: string;
  list: string;
  listColor: string;
  date: string;
  subtasks: SubtaskType[];
  taskStatus: boolean;
};
export type MainTaskChangesType = {
  taskID: string;
  title: string;
  description: string;
  list: string;
  listColor: string;
  date: string;
  taskStatus: boolean;
};
export type SubtasksChangesType = SubtaskType[];
