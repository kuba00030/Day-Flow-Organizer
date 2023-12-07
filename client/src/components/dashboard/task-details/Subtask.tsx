import IconButton from "../../ui/buttons/IconButton";
import InputLabeled from "../../ui/inputs/InputLabeled";
import { MdAdd as AddIcon } from "react-icons/md";
import { MdDeleteForever as DeleteDescriptionIcon } from "react-icons/md";
import { RiDeleteBack2Fill as DeleteSubtaskIcon } from "react-icons/ri";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import { SubtaskType } from "../../../types/TaskType";
import { editSubtask } from "../../../utils/task-details/editSubtask";
type TSubtask = {
  subtask: SubtaskType;
  title: string;
  index: number;
  subtasks: SubtaskType[];
  setSubtasks: React.Dispatch<React.SetStateAction<SubtaskType[]>>;
};
export default function Subtask(props: TSubtask) {
  return (
    <div className="d-flex flex-row gap-2 align-items-start">
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <InputLabeled
            inputStyle={`${
              props.subtask.title !== ""
                ? "border-0 focus-ring"
                : "border border-secondary-subtle focus-ring"
            } bg-transparent rounded text-secondary fw-semibold txt-small d-flex`}
            inputType="text"
            inputValue={props.subtask.title}
            onChange={(e) => {
              editSubtask(
                props.subtasks,
                props.setSubtasks,
                "title",
                e.target.value,
                props.title
              );
            }}
          />
          {/* Code below: add subtask description if subtask doesnt have it */}
          {props.subtask.description === undefined ? (
            <IconButton
              icon={<AddIcon className="regular-icon" />}
              size="sm"
              buttonClass="d-flex flex-row align-items-center accordion-item-txt text-secondary fw-semibold border-0 rounded bg-transparent"
              function={() => {
                props.subtasks[props.index].description = "";
                props.setSubtasks([...props.subtasks]);
              }}
            />
          ) : null}
        </div>
        {props.subtask.description !== undefined ? (
          <div className="d-flex flex-row mt-1">
            <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
            <InputLabeled
              inputStyle={`${
                props.subtask.description !== ""
                  ? "border-0 focus-ring"
                  : "border border-secondary-subtle focus-ring"
              } bg-transparent rounded text-secondary fw-semibold txt-small`}
              inputType="text"
              inputValue={props.subtask.description}
              onChange={(e) => {
                editSubtask(
                  props.subtasks,
                  props.setSubtasks,
                  "description",
                  e.target.value,
                  props.title
                );
              }}
            />
            <IconButton
              icon={<DeleteDescriptionIcon className="regular-icon" />}
              size="sm"
              buttonClass="d-flex flex-row align-items-center accordion-item-txt text-secondary fw-semibold border-0 rounded bg-transparent"
              function={() => {
                props.subtasks[props.index].description = undefined;
                props.setSubtasks([...props.subtasks]);
              }}
            />
          </div>
        ) : null}
      </div>
      <DeleteSubtaskIcon
        type="button"
        className="ms-auto mt-1 regular-icon text-secondary"
        onClick={() => {
          props.setSubtasks(
            props.subtasks.filter(
              (deleteSub) => deleteSub.title !== props.subtask.title
            )
          );
        }}
      >
        Delete
      </DeleteSubtaskIcon>
    </div>
  );
}
