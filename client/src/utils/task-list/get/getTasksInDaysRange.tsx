import { Task, TaskLists } from "../../../context/tasksContext";
import getCurrentDate from "./getCurrentDate";

export default function getTasksInDaysRange(
  taskLists: TaskLists,
  endDateOffset: number
): Task[] {
  let tasks: Task[] = [];

  taskLists.forEach((list) => {
    if (list.tasks.length) {
      tasks.push(...list.tasks);
    }
  });

  tasks = tasks.filter((task) => {
    const taskDate = new Date(task.start);

    return (
      taskDate >= new Date(getCurrentDate()) &&
      taskDate <=
        new Date(
          new Date(getCurrentDate()).getTime() +
            endDateOffset * 24 * 60 * 60 * 1000
        )
    );
  });

  return tasks;
}
