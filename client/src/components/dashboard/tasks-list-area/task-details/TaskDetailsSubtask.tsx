import { Container } from "react-bootstrap";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import {
  MainTaskChangesType,
  SubtasksChangesType,
} from "../../../../types/TaskType";
import { editSubtask } from "../../../../utils/task-details/EditTaskValue";
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
    <Container className=" d-flex flex-column  task-details-info task-details-subtask ">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <input
          className="border-0 bg-transparent rounded text-secondary fw-semibold txt-small"
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
      </div>
      {props.description === null ? null : (
        <div className="d-flex flex-row  mt-1">
          <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
          <input
            className="border-0 bg-transparent rounded text-secondary fw-semibold txt-small ms-1 text-break"
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
