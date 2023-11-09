export type SubtaskType = {
  title: string;
  isDone: boolean;
  description: string;
};
export type TaskType = {
  title: string;
  description: string;
  list: string;
  date: string;
  subtasks: SubtaskType[];
  taskStatus: boolean;
};
