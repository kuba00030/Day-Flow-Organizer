import { Task } from "../../context/tasksContext";
// count tasks from certain task list.
// if task has no subtasks consider it as signle task and add 1 to tasksAmount
// if task has subtasks consider each subtask as single task to be done and add 1 to tasksAmount if subtask status is false
export default function countListTasks(taskList: Task[]): number {
  let tasksAmount = 0;
  taskList.forEach((task) => {
    if (task.subtasks.length > 0) {
      tasksAmount =
        tasksAmount +
        task.subtasks.filter((subtask) => subtask.subtaskStatus === false)
          .length;
    } else {
      tasksAmount++;
    }
  });
  return tasksAmount;
}
