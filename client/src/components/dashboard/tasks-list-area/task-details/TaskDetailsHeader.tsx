import { Container } from "react-bootstrap";
import { editTaskValue } from "../../../../utils/task-details/EditTaskValue";
import { MainTaskChangesType } from "../../../../types/TaskType";

type TTaskDetailsHeader = {
  header: string;
  description: string;
  taskProperty: string;
  task: MainTaskChangesType;
  setTask: (task: MainTaskChangesType) => void;
};
export default function TaskDetailsHeader(props: TTaskDetailsHeader) {
  return (
    <Container className="p-0">
      <div className="dashboard-tasks-details-header text-dark-emphasis fw-bold mb-1">
        <span>{props.header}</span>
      </div>
      <div>
        <input
          className="border p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          value={props.description}
          onChange={(e) => {
            editTaskValue(props.task, props.setTask, props.taskProperty, e);
          }}
        />
      </div>
    </Container>
  );
}
