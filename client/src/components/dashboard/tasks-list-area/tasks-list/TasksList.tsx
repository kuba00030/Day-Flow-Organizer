import { Button, Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../IconButton";
import TaskListItem from "./TaskListItem";
import Header from "../../../Header";
type TTaskList = {
  state: boolean;
  setState: (value: boolean) => void;
};
export default function TasksList(props: TTaskList) {
  return (
    <div className="d-flex flex-column w-75">
      <Header
        txt="Today"
        className="dashboard-task-lists-header fw-semibold ms-2 mb-2 text-dark-emphasis"
      />
      <Container className="d-flex flex-column gap-2">
        <IconButton
          icon={<AddIcon className="accordion-item-icon" />}
          txt="Add task"
          buttonStyle="d-flex flex-row align-items-center accordion-item-txt bg-transparent fw-semibold text-secondary border btn-outline-secondary rounded"
        />
        <TaskListItem />
      </Container>
    </div>
  );
}
