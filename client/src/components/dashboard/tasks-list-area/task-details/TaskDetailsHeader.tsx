import { Container } from "react-bootstrap";

type TTaskDetailsHeader = {
  header: string;
  description: string;
};
export default function TaskDetailsHeader(props: TTaskDetailsHeader) {
  return (
    <Container className="p-0">
      <div className="dashboard-tasks-details-header text-dark-emphasis fw-bold mb-1">
        <span>{props.header}</span>
      </div>
      <div className="border p-2 rounded text-secondary fw-semibold dashboard-tasks-details-txt">
        <span>{props.description}</span>
      </div>
    </Container>
  );
}
