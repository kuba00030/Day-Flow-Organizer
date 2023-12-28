import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import { SubtaskType, TaskType } from "../../../../types/TaskType";
import Subtask from "./Subtask";
type TTaskDetailsSubtasks = {
  taskChanges: TaskType;
  setTaskChanges: (task: TaskType) => void;
};
export default function TaskDetailsSubtasks(props: TTaskDetailsSubtasks) {
  const renderSubtasks = (): React.ReactNode => {
    return props.taskChanges.subtasks.map((subtask: SubtaskType, index) => {
      return (
        <Subtask
          subtask={subtask}
          index={index}
          taskChanges={props.taskChanges}
          setTaskChanges={props.setTaskChanges}
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
        buttonClass="d-flex flex-row align-items-center txt-small bg-transparent text-secondary fw-semibold border-0 rounded me-auto"
        function={() => {
          const newSubtaskID = new Date().getTime();
          props.setTaskChanges({
            ...props.taskChanges,
            subtasks: [
              ...props.taskChanges.subtasks,
              {
                subtaskID: `${newSubtaskID}`,
                title: "",
                description: "",
                subtaskStatus: false,
              },
            ],
          });
        }}
      />

      <div className="d-flex flex-column scrollbar pb-1">
        {renderSubtasks()}
      </div>
    </Container>
  );
}
