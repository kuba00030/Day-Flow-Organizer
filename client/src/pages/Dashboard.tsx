import { Container } from "react-bootstrap";
import NavBar from "../components/dashboard/nav/NavBar";
import TaskDetails from "../components/dashboard/tasks-list-area/task-details/TaskDetails";
import TasksList from "../components/dashboard/tasks-list-area/tasks-list/TasksList";
import "../styles/custom-container.css";
import "../styles/dashboard/dashboard-nav.css";
import { useState, useEffect } from "react";
import { TaskType } from "../types/TaskType";
export default function Dashboard() {
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);
  const [tasksList, setTasksList] = useState<TaskType[]>([
    {
      title: "Title example",
      description: "Description example",
      list: "List example",
      date: "01-01-2023",
      subtasks: [],
    },
  ]);
  const [taskDetails, setTaskDetails] = useState<TaskType>();
  useEffect(() => {
    console.log(isTaskOpened);
    // pressing certain task from task lists "Today" TEST
    // press task -> load data from the task on task details
    // if no task is being pressed (on load) select first task from tasks list to be displayed
    if (isTaskOpened === true) {
      setTaskDetails({
        title: "Shopping",
        description: "Buy some pasta",
        list: "Personal",
        date: "01-05-2023",
        subtasks: [],
      });
    } else {
      setTaskDetails(tasksList[1]);
    }
  }, [isTaskOpened]);
  return (
    <div className="d-flex flex-row vw-100 vh-100 p-4">
      <NavBar />
      <Container className="d-flex flex-row p-0">
        <TasksList state={isTaskOpened} setState={setIsTaskOpened} />
        <TaskDetails task={taskDetails} />
      </Container>
    </div>
  );
}
