import ListItem from "../../../components/dashboard/tasks-list-area/tasks-list/list-item/ListItem";
import { Task } from "../../../context/tasksContext";

export default function renderTask(taskList: Task[]) {
  return taskList.map((task: Task) => (
    <ListItem task={task} key={`task ${task.taskID}`} />
  ));
}
