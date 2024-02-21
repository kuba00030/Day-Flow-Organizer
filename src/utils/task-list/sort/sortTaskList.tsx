import { Task, TaskList } from "../../../context/tasksContext";

export type SortingCategories = "Oldest" | "Latest" | "Ongoing" | "Done";

const sortByOldest = (sortedTasks: Task[]) => {
  sortedTasks.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );
};

const sortByLatest = (sortedTasks: Task[]) => {
  sortedTasks.sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
  );
};

export default function sortTaskList(
  sortBy: SortingCategories,
  taskList: TaskList,
  setList: (list: TaskList) => void
): TaskList {
  let sortedTasks: Task[] = [...taskList.tasks];

  if (sortBy === "Oldest") {
    sortByOldest(sortedTasks);
    sortedTasks = sortedTasks.filter((task) => task.taskStatus === false);
  }

  if (sortBy === "Latest") {
    sortByLatest(sortedTasks);
    sortedTasks = sortedTasks.filter((task) => task.taskStatus === false);
  }

  if (sortBy === "Ongoing") {
    const activeTasks = sortedTasks.filter((task) => task.taskStatus === false);
    sortedTasks = activeTasks;
    sortByOldest(sortedTasks);
  }

  if (sortBy === "Done") {
    const doneTasks = sortedTasks.filter((task) => task.taskStatus === true);
    sortedTasks = doneTasks;
    sortByLatest(sortedTasks);
  }
  const sortedList: TaskList = { ...taskList, tasks: sortedTasks };

  setList(sortedList);

  return sortedList;
}
