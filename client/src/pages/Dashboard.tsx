import NavBar from "../components/dashboard/nav/NavBar";
import TaskDetails from "../components/dashboard/tasks-list-area/task-details/TaskDetails";
import TasksList from "../components/dashboard/tasks-list-area/tasks-list/TasksList";
import DefaultModal from "../components/modal/ModalDefault";
import { useModalContext } from "../context/modalContext";
import { useTasksContext } from "../context/tasksContext";
import "../styles/custom-container.css";
import "../styles/dashboard/dashboard-nav.css";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import onLoggedRedirectHook from "../utils/hooks/onLoggedRedirectHook";

export default function Dashboard() {
  const { authContext } = useAuthContext();
  const { currentList } = useTasksContext();
  const { modalContext, setModalContext } = useModalContext();
  const navigate = useNavigate();
  onLoggedRedirectHook(authContext.isLogged, navigate);

  return (
    <div className="d-flex flex-row dashboard-container overflow-hidden">
      <NavBar />
      <div className="d-flex flex-row" style={{flex:1}}>
        <TasksList />
        {currentList.tasks.length ? <TaskDetails /> : null}
      </div>
      <DefaultModal
        show={modalContext.showModal}
        onHide={() =>
          setModalContext({
            ...modalContext,
            showModal: !modalContext.showModal,
          })
        }
        modalcontent={modalContext.modalContent}
      />
    </div>
  );
}
