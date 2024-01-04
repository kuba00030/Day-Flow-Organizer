import IconButton from "../../../ui/buttons/IconButton";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { MdAdd as AddIcon } from "react-icons/md";
import { MdDeleteForever as DeleteDescriptionIcon } from "react-icons/md";
import { RiDeleteBack2Fill as DeleteSubtaskIcon } from "react-icons/ri";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";

import { editSubtask } from "../../../../utils/task-details/editSubtask";
import { SubtaskType, Task } from "../../../../context/tasksContext";
import { useState } from "react";
type TSubtask = {
  subtask: SubtaskType;
  index: number;
  taskChanges: Task;
  setTaskChanges: React.Dispatch<React.SetStateAction<Task>>;
};
export default function Subtask(props: TSubtask) {
  return (
    <div className="d-flex flex-column gap-2" style={{ flex: 1 }}>
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
              props.subtask.subtaskID
            );
          }}
        />
        {/* Code below: add subtask description if subtask doesnt have it */}
        {props.subtask.description === undefined ? (
          <AddIcon
            className="regular-icon text-secondary"
            style={{ cursor: "pointer" }}
            onClick={() => {
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
        />
      </div>
      {props.subtask.description !== undefined ? (
        <div className="d-flex flex-row mt-1 gap-2 w-100">
          <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
          <div className="d-flex overflow-hidden" style={{ flex: 1 }}>
            <span
              className={`d-flex focus-ring ps-1 pe-1  rounded text-secondary fw-semibold txt-small`}
              contentEditable
              style={{ wordWrap: "break-word" }}
            ></span>
          </div>
          <DeleteDescriptionIcon
            className="regular-icon text-secondary ms-auto"
            style={{ cursor: "pointer" }}
            onClick={() => {
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
  );
}
