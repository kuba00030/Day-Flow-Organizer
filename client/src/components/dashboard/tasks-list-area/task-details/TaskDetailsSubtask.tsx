import { Container } from "react-bootstrap";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import {
  MainTaskChangesType,
  SubtasksChangesType,
} from "../../../../types/TaskType";
import { editSubtask } from "../../../../utils/task-details/editTaskValue";
type TTaskDetailsSubtask = {
  title: string;
  subtaskStatus: boolean;
  description: string | null;
  subtaskID: string;
  subtasks: SubtasksChangesType;
  setSubtasks: (subtasks: SubtasksChangesType) => void;
};
export default function TaskDetailsSubtask(props: TTaskDetailsSubtask) {
  return (
    <Container className=" d-flex flex-column mt-2">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <input
          className={`${
            props.title !== "" ? "border-0" : "border border-secondary-subtle"
          } bg-transparent rounded text-secondary fw-semibold txt-small focus-ring`}
          value={props.title}
          onChange={(e: any) => {
            editSubtask(
              props.subtasks,
              props.setSubtasks,
              "title",
              e.target.value,
              props.subtaskID
            );
          }}
        />
        {props.description === undefined ? (
          <input
            type="checkbox"
            checked={props.subtaskStatus === true ? true : false}
            onClick={(e: any) => {
              editSubtask(
                props.subtasks,
                props.setSubtasks,
                "subtaskStatus",
                e.target.checked,
                props.subtaskID
              );
            }}
            className="small-icon flex-shrink-0 ms-auto"
          />
        ) : null}
      </div>
      {props.description === undefined ? null : (
        <div className="d-flex flex-row  mt-1">
          <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
          <input
            className={`${
              props.description !== ""
                ? "border-0"
                : "border border-secondary-subtle"
            } bg-transparent rounded text-secondary fw-semibold txt-small focus-ring`}
            value={props.description}
            onChange={(e: any) => {
              editSubtask(
                props.subtasks,
                props.setSubtasks,
                "description",
                e.target.value,
                props.subtaskID
              );
            }}
          />

          <input
            type="checkbox"
            checked={props.subtaskStatus === true ? true : false}
            onClick={(e: any) => {
              editSubtask(
                props.subtasks,
                props.setSubtasks,
                "subtaskStatus",
                e.target.checked,
                props.subtaskID
              );
            }}
            className="small-icon flex-shrink-0 ms-auto"
          />
        </div>
      )}
    </Container>
  );
}
