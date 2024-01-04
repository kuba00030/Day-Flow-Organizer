import { Task, TaskLists } from "../../../context/tasksContext";

export default function deleteTask(
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void,
  taskToDel: Task
) {
  const updatedLists = [...taskLists];

  const listIndex = taskLists.findIndex(
    (list) => list.listName === taskToDel.list
  );

  const taskIndex = taskLists[listIndex].tasks.findIndex(
    (task) => task.taskID === taskToDel.taskID
  );

  updatedLists[listIndex].tasks.splice(taskIndex, 1);

  setTaskLists(updatedLists);
}
