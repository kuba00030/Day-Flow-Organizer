import { Container } from "react-bootstrap";

type TTaskDetailsHeader = {
  header: string;
  description: string;
  editTask: (property: string, e: any) => void;
  taskProperty: string;
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
            props.editTask(props.taskProperty, e);
          }}
        />
      </div>
    </Container>
  );
}
