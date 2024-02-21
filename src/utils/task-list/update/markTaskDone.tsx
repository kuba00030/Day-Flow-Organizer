import { Task, TaskLists } from "../../../context/tasksContext";

export default function markTaskDone(
  taskLists: TaskLists,
  givenTask: Task,
  setTaskLists: (taskLists: TaskLists) => void
) {
  const listIndex = taskLists.findIndex(
    (list) => list.listName === givenTask.list
  );

  const taskIndex = taskLists[listIndex].tasks.findIndex(
    (task) => task.taskID === givenTask.taskID
  );

  const editedTaskLists = [...taskLists];

  editedTaskLists[listIndex].tasks[taskIndex].taskStatus =
    !givenTask.taskStatus;

  setTaskLists(editedTaskLists);
}
