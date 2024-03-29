import { Task, TaskList, TaskLists } from "../../../context/tasksContext";

export default function updateTask(
  originTask: Task,
  editedTask: Task,
  setCurrentList: (list: TaskList) => void,
  setTaskLists: (lists: TaskLists) => void,
  taskLists: TaskLists
) {
  const originListIndex = taskLists.findIndex(
    (list) => list.listName === originTask.list
  );

  const editedListIndex = taskLists.findIndex(
    (list) => list.listName === editedTask.list
  );

  let updatedTaskLists = [...taskLists];

  if (originTask.list === editedTask.list) {
    const taskIndex = taskLists[originListIndex].tasks.findIndex(
      (task) => task.taskID === editedTask.taskID
    );

    updatedTaskLists[originListIndex].tasks[taskIndex] = editedTask;

    setCurrentList({ ...updatedTaskLists[originListIndex] });

    setTaskLists(updatedTaskLists);
  } else {
    const taskIndex = taskLists[originListIndex].tasks.findIndex(
      (task) => task.taskID === originTask.taskID
    );

    updatedTaskLists[originListIndex].tasks.splice(taskIndex, 1);

    updatedTaskLists[editedListIndex].tasks.push(editedTask);

    setCurrentList({ ...updatedTaskLists[editedListIndex] });

    setTaskLists(updatedTaskLists);
  }
}
