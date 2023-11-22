import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import TaskListItem from "./TasksListItem";
import Header from "../../../Header";
import { TaskType } from "../../../../types/TaskType";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import AddTaskModalContent from "../../../modal/AddTaskModalContent";
type TTaskList = {
  tasksList: TaskType[];
};
export default function TasksList(props: TTaskList) {
  const { setModalContent, setShowModal, showModal } = useContext(ModalContext);
  const renderTasks = (): React.ReactNode => {
    return props.tasksList.map((task: TaskType, index: number) => (
      <TaskListItem task={task} key={`task ${index}`} />
    ));
  };
  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <Header
        txt="Today"
        className="txt-larger fw-semibold ms-2 mb-2 text-dark-emphasis"
      />
      <Container className="d-flex flex-column gap-2" style={{ flex: 1 }}>
        <IconButton
          icon={<AddIcon className="accordion-item-icon" />}
          txt="Add task"
          size="sm"
          buttonClass="d-flex flex-row align-items-center accordion-item-txt bg-transparent fw-semibold text-secondary border border-secondary-subtle btn-outline-secondary rounded"
          function={() => {
            setModalContent(<AddTaskModalContent />);
            setShowModal(!showModal);
          }}
        />
        {props.tasksList.length > 0 ? (
          renderTasks()
        ) : (
          <div
            className="d-flex justify-content-center align-items-center text-center  text-secondary fw-semibold txt-small"
            style={{ flex: 1 }}
          >
            Add your first task
          </div>
        )}
      </Container>
    </div>
  );
}
