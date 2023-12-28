import TaskListItem from "../../../components/dashboard/tasks-list-area/tasks-list/TasksListItem";
import { TaskType } from "../../../types/TaskType";

export default function renderTask(taskList: TaskType[]) {
  return taskList.map((task: TaskType, index: number) => (
    <TaskListItem task={task} key={`task ${index}`} />
  ));
}
