import TaskListItem from "../../../components/dashboard/tasks-list-area/tasks-list/TasksListItem";
import { Task } from "../../../context/tasksContext";

export default function renderTask(taskList: Task[]) {
  return taskList.map((task: Task, index: number) => (
    <TaskListItem task={task} key={`task ${index}`} />
  ));
}
