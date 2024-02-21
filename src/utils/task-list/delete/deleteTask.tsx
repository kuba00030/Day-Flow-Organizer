import { Task, TaskList, TaskLists } from "../../../context/tasksContext";

export default function deleteTask(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
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

  const updatedList = updatedLists.find(
    (list) => list.listName === taskToDel.list
  );

  setTaskLists(updatedLists);

  setCurrentList({ ...updatedList, tasks: updatedList.tasks });
}
