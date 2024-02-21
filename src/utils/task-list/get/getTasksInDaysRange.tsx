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

  const currentDate = new Date(getCurrentDate());
  const startDate = new Date(currentDate.setHours(0, 0, 0, 0));
  const endDate = new Date(
    currentDate.getTime() + endDateOffset * 24 * 60 * 60 * 1000
  );

  tasks = tasks.filter((task) => {
    const taskDate = new Date(task.start);

    return taskDate >= startDate && taskDate <= endDate;
  });

  return tasks;
}
