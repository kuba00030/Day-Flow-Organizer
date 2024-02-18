import { Task, TaskList, TaskLists } from "../../../context/tasksContext";

export default function deleteTask(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
  currentList: TaskList,
  setCurrentList: (list: TaskList) => void,
  taskToDel: Task
) {
  const updatedLists = taskLists.map((list) => {
    if (list.listName === taskToDel.list) {
      list.tasks = list.tasks.filter(
        (task) => task.taskID !== taskToDel.taskID
      );
      return list;
    }
    return list;
  });

  setTaskLists(updatedLists);

  if (currentList.listName === taskToDel.list) {
    setCurrentList(taskLists.find((list) => list.listName === taskToDel.list));
  }
}
