import { Container } from "react-bootstrap";
import { useContext } from "react";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import TaskDetailsSubtask from "./TaskDetailsSubtask";
import { SubtaskType, SubtasksChangesType } from "../../../../types/TaskType";
import { ModalContext } from "../../../../context/modalContext";
import AddSubtaskModal from "../../../modal/AddSubtaskModalContent";
type TTaskDetailsSubtasks = {
  subtasks: SubtasksChangesType;
  setSubtasks: (subtasks: SubtasksChangesType) => void;
};
export default function TaskDetailsSubtasks(props: TTaskDetailsSubtasks) {
  const { showModal, setShowModal, setModalContent } = useContext(ModalContext);
  const renderSubtasks = (): React.ReactNode => {
    return props.subtasks.map((subtask: SubtaskType, index) => {
      return (
        <TaskDetailsSubtask
          title={subtask.title}
          description={subtask.description}
          subtaskStatus={subtask.subtaskStatus}
          subtaskID={subtask.subtaskID}
          key={`Subtask ${index}`}
          subtasks={props.subtasks}
          setSubtasks={props.setSubtasks}
        />
      );
    });
  };
  return (
    <Container className=" p-0 d-flex flex-column overflow-hidden">
      <div className="text-dark-emphasis fw-bold txt-medium">
        <span>Subtasks:</span>
      </div>
      <IconButton
        icon={<AddIcon className="regular-icon" />}
        txt="Add subtask"
        size="sm"
        buttonClass="d-flex flex-row align-items-center txt-small bg-transparent text-secondary fw-semibold border-0 rounded"
        function={() => {
          setModalContent(<AddSubtaskModal />);
          setShowModal(!showModal);
        }}
      />

      <div className="d-flex flex-column scrollbar pb-1">
        {renderSubtasks()}
      </div>
    </Container>
  );
}
