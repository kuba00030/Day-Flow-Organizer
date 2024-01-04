import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import Subtask from "./Subtask";
import { SubtaskType, Task } from "../../../../context/tasksContext";
import { useModalContext } from "../../../../context/modalContext";
import AddSubtaskModalContent from "../../../modal/AddSubtaskModalContent";
type TTaskDetailsSubtasks = {
  currentTask: Task;
  setCurrentTask: (task: Task) => void;
};
export default function TaskDetailsSubtasks(props: TTaskDetailsSubtasks) {
  const { modalContext, setModalContext } = useModalContext();
  const renderSubtasks = (): React.ReactNode => {
    return props.currentTask.subtasks.map((subtask: SubtaskType, index) => {
      return <Subtask subtask={subtask} index={index} />;
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
        buttonClass="d-flex flex-row align-items-center txt-small bg-transparent text-secondary fw-semibold border-0 rounded me-auto"
        function={() => {
          setModalContext({
            modalContent: <AddSubtaskModalContent />,
            showModal: !modalContext.showModal,
          });
        }}
      />
      <div className="d-flex flex-column scrollbar px-2 py-1 gap-4">
        {renderSubtasks()}
      </div>
    </Container>
  );
}
