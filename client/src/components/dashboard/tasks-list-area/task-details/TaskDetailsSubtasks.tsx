import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../IconButton";
import TaskDetailsSubtask from "./TaskDetailsSubtask";
export default function TaskDetailsSubtasks() {
  return (
    <Container className="p-0">
      <div className="dashboard-tasks-details-header text-dark-emphasis fw-bold">
        <span>Subtasks:</span>
      </div>
      <IconButton
        icon={<AddIcon className="regular-icon" />}
        txt="Add subtask"
        buttonStyle="d-flex flex-row align-items-center accordion-item-txt bg-transparent text-secondary fw-semibold border-0 rounded"
      />
      <TaskDetailsSubtask />
      <TaskDetailsSubtask />
      <TaskDetailsSubtask />
      <TaskDetailsSubtask />
    </Container>
  );
}
