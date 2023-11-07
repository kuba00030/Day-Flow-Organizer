import { Container } from "react-bootstrap";
import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskDetailsInfo from "./TaskDetailsInfo";
import TaskDetailsSubtasks from "./TaskDetailsSubtasks";
import { TaskType } from "../../../../types/TaskType";
type TTaskDetails = {
  task?: TaskType;
};
export default function TaskDetails(props: TTaskDetails) {
  return (
    <div
      className="bg-body-secondary rounded dashboard-tasks-details "
      style={{
        flex: 1,
      }}
    >
      <Container className="p-0 d-flex flex-column dashboard-tasks-details-slider ">
        <TaskDetailsHeader header="Task" description={props.task.title} />
        <TaskDetailsHeader
          header="Description"
          description={props.task.description}
        />
        <TaskDetailsInfo date={props.task.date} />
        <TaskDetailsSubtasks />
      </Container>
    </div>
  );
}
