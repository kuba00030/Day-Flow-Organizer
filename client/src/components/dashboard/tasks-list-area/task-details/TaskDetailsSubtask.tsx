import { Container } from "react-bootstrap";

export default function TaskDetailsSubtask() {
  return (
    <Container className="d-flex flex-row align-items-center task-details-info task-details-subtask">
      <input
        type="checkbox"
        onClick={() => {
          console.log("task is done");
        }}
        className="checkbox"
      />
      <span className="text-secondary fw-semibold">task to be done</span>
    </Container>
  );
}
