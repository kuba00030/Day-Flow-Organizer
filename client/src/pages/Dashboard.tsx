import NavBar from "../components/dashboard/nav/NavBar";
import TaskDetails from "../components/dashboard/tasks-list-area/task-details/TaskDetails";
import TasksList from "../components/dashboard/tasks-list-area/tasks-list/TasksList";
import { TasksContext } from "../context/tasksContext";
import "../styles/custom-container.css";
import "../styles/dashboard/dashboard-nav.css";
import { useEffect, useContext } from "react";

export default function Dashboard() {
  const { isTaskOpened, tasksList, taskDetails } = useContext(TasksContext);

  useEffect(() => {}, [isTaskOpened]);
  // create context for tasks list and task details
  // isTaskOpened,taskValue,
  return (
    <div className="d-flex flex-row dashboard-container">
      <NavBar />
      <div className="d-flex flex-row p-0 container-fluid">
        <TasksList tasksList={tasksList} />
        <TaskDetails />
      </div>
    </div>
  );
}
