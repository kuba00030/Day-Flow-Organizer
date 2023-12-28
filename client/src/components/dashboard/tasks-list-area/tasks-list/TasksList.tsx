import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import Header from "../../../Header";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import AddTaskModalContent from "../../../modal/AddTaskModalContent";
import { TasksContext } from "../../../../context/tasksContext";
import AddNewListModalContent from "../../../modal/AddNewListModalContent";
import renderTaskList from "../../../../utils/task-list/render/renderTaskList";

export default function TasksList() {
  const { setModalContent, setShowModal, showModal } = useContext(ModalContext);
  const { taskLists, taskList } = useContext(TasksContext);
  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <Header
        txt={`${taskList.listName}`}
        className="txt-larger fw-semibold ms-2 mb-2 text-dark-emphasis"
      />
      <Container className="d-flex flex-column gap-2" style={{ flex: 1 }}>
        <IconButton
          icon={<AddIcon className="accordion-item-icon" />}
          txt="Add task"
          size="sm"
          buttonClass="d-flex flex-row align-items-center accordion-item-txt bg-transparent fw-semibold text-secondary border border-secondary-subtle btn-outline-secondary rounded"
          function={() => {
            if (taskLists.length > 0) {
              setModalContent(<AddTaskModalContent />);
              setShowModal(!showModal);
            } else {
              setModalContent(<AddNewListModalContent />);
              window.alert(
                "You have no task list created yet. Please create new task list first."
              );
              setShowModal(!showModal);
            }
          }}
        />
        {renderTaskList(taskList)}
      </Container>
    </div>
  );
}
