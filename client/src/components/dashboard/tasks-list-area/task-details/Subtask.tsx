import IconButton from "../../../ui/buttons/IconButton";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { MdAdd as AddIcon } from "react-icons/md";
import { MdDeleteForever as DeleteDescriptionIcon } from "react-icons/md";
import { RiDeleteBack2Fill as DeleteSubtaskIcon } from "react-icons/ri";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import { SubtaskType, TaskType } from "../../../../types/TaskType";
import { editSubtask } from "../../../../utils/task-details/editSubtask";
type TSubtask = {
  subtask: SubtaskType;
  index: number;
  taskChanges: TaskType;
  setTaskChanges: React.Dispatch<React.SetStateAction<TaskType>>;
};
export default function Subtask(props: TSubtask) {
  return (
    <div
      className="d-flex flex-row gap-2 align-items-start"
      style={{ padding: "5px" }}
    >
      <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center">
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
                props.taskChanges,
                props.setTaskChanges,
                "title",
                e.target.value,
                props.subtask.title
              );
            }}
          />
          {/* Code below: add subtask description if subtask doesnt have it */}
          {props.subtask.description === undefined ? (
            <IconButton
              icon={<AddIcon className="regular-icon" />}
              size="sm"
              buttonClass="d-flex flex-row align-items-center  text-secondary fw-semibold border-0 rounded bg-transparent"
              function={() => {
                props.taskChanges.subtasks[props.index].description = "";
                props.setTaskChanges({
                  ...props.taskChanges,
                  subtasks: [...props.taskChanges.subtasks],
                });
              }}
            />
          ) : null}
          <DeleteSubtaskIcon
            type="button"
            className="ms-auto regular-icon text-secondary"
            onClick={() => {
              props.setTaskChanges({
                ...props.taskChanges,
                subtasks: props.taskChanges.subtasks.filter(
                  (deleteSub) => deleteSub.subtaskID !== props.subtask.subtaskID
                ),
              });
            }}
          ></DeleteSubtaskIcon>
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
                  props.taskChanges,
                  props.setTaskChanges,
                  "description",
                  e.target.value,
                  props.subtask.title
                );
              }}
            />
            <IconButton
              icon={<DeleteDescriptionIcon className="regular-icon" />}
              size="sm"
              buttonClass="d-flex flex-row align-items-center  text-secondary fw-semibold border-0 rounded bg-transparent"
              function={() => {
                props.taskChanges.subtasks[props.index].description = undefined;
                props.setTaskChanges({
                  ...props.taskChanges,
                  subtasks: [...props.taskChanges.subtasks],
                });
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
