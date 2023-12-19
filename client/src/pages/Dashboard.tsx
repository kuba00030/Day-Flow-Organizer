import NavBar from "../components/dashboard/nav/NavBar";
import TaskDetails from "../components/dashboard/tasks-list-area/task-details/TaskDetails";
import TasksList from "../components/dashboard/tasks-list-area/tasks-list/TasksList";
import DefaultModal from "../components/modal/ModalDefault";
import { ModalContext } from "../context/modalContext";
import { TasksContext } from "../context/tasksContext";
import "../styles/custom-container.css";
import "../styles/dashboard/dashboard-nav.css";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import onLoggedRedirectHook from "../utils/hooks/onLoggedRedirectHook";

export default function Dashboard() {
  const { isLogged } = useContext(AuthContext);
  const { taskList } = useContext(TasksContext);
  const { showModal, setShowModal, modalContent } = useContext(ModalContext);
  const navigate = useNavigate();
  onLoggedRedirectHook(isLogged, navigate);
  return (
    <div className="d-flex flex-row dashboard-container overflow-hidden">
      <NavBar />
      <div className="d-flex flex-row p-0 container-fluid">
        <TasksList />
        {taskList.tasks.length > 0 ? <TaskDetails /> : null}
      </div>
      <DefaultModal
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        modalcontent={modalContent}
      />
    </div>
  );
}
