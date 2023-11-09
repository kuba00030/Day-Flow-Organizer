import { Container } from "react-bootstrap";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
type TTaskDetailsSubtask = {
  title: string;
  isDone: boolean;
  description: string | null;
};
export default function TaskDetailsSubtask(props: TTaskDetailsSubtask) {
  return (
    <Container className=" d-flex flex-column  task-details-info task-details-subtask">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="text-secondary fw-semibold  txt-small">
          {props.title}
        </span>
        <input
          type="checkbox"
          onClick={() => {
            console.log("task is done");
          }}
          className="small-icon"
        />
      </div>
      {props.description === null ? null : (
        <div className="d-flex flex-row  mt-1">
          <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
          <span className="fw-semibold text-secondary txt-small ms-1 text-break">
            {props.description}
          </span>
          <input
            type="checkbox"
            onClick={() => {
              console.log("task is done");
            }}
            className="small-icon flex-shrink-0 ms-auto"
          />
        </div>
      )}
    </Container>
  );
}
