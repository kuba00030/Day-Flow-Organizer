import { Task, TaskLists } from "../../../context/tasksContext";
import countListTasks from "../countListTasks";
import getCurrentDate from "./getCurrentDate";

export default function getTasksInDaysRange(
  taskLists: TaskLists,
  endDateOffset: number
) {
  let tasks: Task[] = [];
  let tasksAmount: number;

  taskLists.forEach((list) => {
    if (list.tasks.length) {
      tasks.push(...list.tasks);
    }
  });
  tasks = tasks.filter((task) => {
    const taskDate = new Date(task.date);
    return (
      taskDate >= new Date(getCurrentDate()) &&
      taskDate <=
        new Date(
          new Date(getCurrentDate()).getTime() +
            endDateOffset * 24 * 60 * 60 * 1000
        )
    );
  });
  tasksAmount = countListTasks(tasks);
  return { tasks, tasksAmount };
}