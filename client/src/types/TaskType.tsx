export type SubtaskType = {
  title: string;
  subtaskStatus: boolean;
  description?: string;
};
export type TaskType = {
  date: string;
  description: string;
  taskStatus: boolean;
  title: string;
  list: string;
  listColor: string;
  subtasks: SubtaskType[];
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
