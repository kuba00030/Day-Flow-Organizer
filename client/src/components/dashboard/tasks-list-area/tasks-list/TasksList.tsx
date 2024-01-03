import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import Header from "../../../Header";
import { useModalContext } from "../../../../context/modalContext";
import AddTaskModalContent from "../../../modal/AddTaskModalContent";
import { useTasksContext } from "../../../../context/tasksContext";
import AddNewListModalContent from "../../../modal/AddNewListModalContent";
import renderTaskList from "../../../../utils/task-list/render/renderTaskList";

export default function TasksList() {
  const { modalContext, setModalContext } = useModalContext();
  const { taskLists, currentList } = useTasksContext();
  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <Header
        txt={`${currentList.listName}`}
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
              setModalContext({
                showModal: !modalContext.showModal,
                modalContent: <AddTaskModalContent />,
              });
            } else {
              window.alert(
                "You have no task list created yet. Please create new task list first."
              );
              setModalContext({
                showModal: !modalContext.showModal,
                modalContent: <AddNewListModalContent />,
              });
            }
          }}
        />
        {renderTaskList(currentList)}
      </Container>
    </div>
  );
}
