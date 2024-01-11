import { TaskList } from "../../../context/tasksContext";

export default function sortTaskList(
  sortBy: "Default" | "Oldest" | "Latest",
  taskList: TaskList,
  setList: (list: TaskList) => void
): TaskList {
  const sortedTasks = [...taskList.tasks];

  switch (sortBy) {
    case "Oldest":
      sortedTasks.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      break;

    case "Latest":
      sortedTasks.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      break;

    default:
      break;
  }

  const sortedList: TaskList = { ...taskList, tasks: sortedTasks };
  setList(sortedList);

  return sortedList;
}
