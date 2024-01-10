import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import { useModalContext } from "../../../../context/modalContext";
import AddSubtaskModalContent from "../../../modal/AddSubtaskModalContent";
import renderSubtasks from "../../../../utils/task-list/render/renderSubtasks";
import { useTasksContext } from "../../../../context/tasksContext";

export default function TaskDetailsSubtasks() {
  const { modalContext, setModalContext } = useModalContext();
  const { editedTask } = useTasksContext();
  return (
    <Container className=" p-0 d-flex  flex-column overflow-hidden">
      <div className="bg-transparent text-dark-emphasis fw-bold txt-medium">
        <span>Subtasks:</span>
      </div>
      <IconButton
        icon={<AddIcon className="regular-icon" />}
        txt="Add subtask"
        buttonClass="d-flex flex-row align-items-center txt-small bg-transparent text-secondary fw-semibold border-0 rounded me-auto"
        function={() => {
          setModalContext({
            modalContent: <AddSubtaskModalContent />,
            showModal: !modalContext.showModal,
          });
        }}
      />

      <div className="d-flex flex-column my-scrollbar px-3 py-2 gap-4">
        {renderSubtasks(editedTask.subtasks)}
      </div>
    </Container>
  );
}
