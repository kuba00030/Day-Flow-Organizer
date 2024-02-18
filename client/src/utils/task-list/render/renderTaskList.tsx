import { TaskList } from "../../../context/tasksContext";
import renderTask from "./renderTask";

export default function renderTaskList(taskList: TaskList) {
  if (taskList.listName === "Upcoming") {
    if (taskList.tasks.length) {
      return renderTask(taskList.tasks);
    } else {
      return (
        <div
          className="d-flex justify-content-center align-items-center text-center  text-secondary fw-semibold txt-small"
          style={{ flex: 1 }}
        >
          No tasks for upcoming days
        </div>
      );
    }
  }
  if (taskList.listName === "Today") {
    if (taskList.tasks.length) {
      return renderTask(taskList.tasks);
    } else {
      return (
        <div
          className="d-flex justify-content-center align-items-center text-center  text-secondary fw-semibold txt-small"
          style={{ flex: 1 }}
        >
          No tasks for today
        </div>
      );
    }
  }
  if (taskList.listName !== "Upcoming" && taskList.listName !== " Today") {
    if (taskList.tasks.length) {
      return renderTask(taskList.tasks);
    } else {
      return (
        <div
          className="d-flex justify-content-center align-items-center text-center  text-secondary fw-semibold txt-small"
          style={{ flex: 1 }}
        >
          Add your first task
        </div>
      );
    }
  }
}
