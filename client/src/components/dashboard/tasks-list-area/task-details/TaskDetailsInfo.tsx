import { Container } from "react-bootstrap";
type TTaskDetailsInfo = {
  date: string;
};
export default function TaskDetailsInfo(props: TTaskDetailsInfo) {
  return (
    <Container className="p-0 d-flex flex-column gap-1">
      <Container className="d-flex flex-row w-100 justify-content-between">
        <div>
          <span className="text-secondary fw-semibold dashboard-tasks-details-txt">
            List
          </span>
        </div>
        <select className="dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary">
          <option className="text-secondary fw-semibold dashboard-tasks-details-txt">
            Personal
          </option>
          <option className="text-secondary fw-semibold dashboard-tasks-details-txt">
            Work
          </option>
        </select>
      </Container>
      <Container className="d-flex flex-row w-100 justify-content-between">
        <div>
          <span className="text-secondary fw-semibold dashboard-tasks-details-txt">
            Due date
          </span>
        </div>
        <input
          type="date"
          value={props.date}
          className="dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary"
        />
      </Container>
    </Container>
  );
}
