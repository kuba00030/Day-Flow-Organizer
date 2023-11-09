import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../IconButton";
import TaskListItem from "./TasksListItem";
import Header from "../../../Header";
import { TaskType } from "../../../../types/TaskType";
type TTaskList = {
  tasksList: TaskType[];
};
export default function TasksList(props: TTaskList) {
  const renderTasks = (): React.ReactNode => {
    return props.tasksList.map((task: TaskType, index: number) => (
      <TaskListItem task={task} key={`task ${index}`} />
    ));
  };
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
        {renderTasks()}
      </Container>
    </div>
  );
}
