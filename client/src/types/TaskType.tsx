export type SubtaskType = {
  subtaskID: string;
  title: string;
  subtaskStatus: boolean;
  description: string | undefined;
};
export type TaskType = {
  date: string;
  description: string;
  taskStatus: boolean;
  title: string;
  taskID: string;
  list: string;
  listColor: string;
  subtasks: SubtaskType[];
};
