import { ReactNode, useRef, useState } from "react";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import { SubtaskType, Task } from "../../../../context/tasksContext";
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { MdRestoreFromTrash as RestoreIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import useSlideInOnClick from "../../../../hooks/useSlideInOnClick";

type SubtaskModal = {
  subtask: SubtaskType;
  newTask: Task;
  setNewTask: (task: Task) => void;
  index: number;
};

export default function SubtaskModal(props: SubtaskModal): ReactNode {
  const [optionsOpened, setOptionsOpened] = useState<boolean>(false);
  const editedSubtasks = props.newTask.subtasks;
  const optionsRef = useRef(null);

  const setSubtaskDescription = () => {
    let subtaskDesc = editedSubtasks[props.index].description;
    if (subtaskDesc !== undefined) {
      subtaskDesc = undefined;
      editedSubtasks[props.index].description = subtaskDesc;
      props.setNewTask({ ...props.newTask, subtasks: [...editedSubtasks] });
    } else {
      subtaskDesc = "";
      editedSubtasks[props.index].description = subtaskDesc;
      props.setNewTask({ ...props.newTask, subtasks: [...editedSubtasks] });
    }
  };

  const deleteSubtask = () => {
    editedSubtasks.splice(props.index, 1);
    props.setNewTask({ ...props.newTask, subtasks: [...editedSubtasks] });
  };

  useSlideInOnClick(
    optionsRef,
    optionsOpened,
    setOptionsOpened,
    "right",
    20,
    500000000000
  );

  return (
    <div className="d-flex flex-column my-bg-dark rounded add-task-subtask-container scaleHover position-relative overflow-hidden pe-4 fadeIn">
      <InputLabeled
        inputType="text"
        inputStyle="w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
        inputValue={props.subtask.title}
        inputPlaceholder="Subtask title..."
        onChange={(e) => {
          editedSubtasks[props.index].title = e.target.value;
          props.setNewTask({
            ...props.newTask,
            subtasks: [...editedSubtasks],
          });
        }}
      />
      {props.subtask.description !== undefined ? (
        <div className="d-flex flex-row align-items-start">
          <SubtaskIcon className="mt-3" style={{ color: "white" }} />
          <TxtAreaLabeled
            labelValue=""
            labelClass="my-color-light fw-semibold mb-1 txt-small"
            placeholder="Subtask description..."
            txtAreaClass="task-details-descripion w-100 txt-small my-bg-dark border-0 my-color-light p-2 fw-semibold"
            containerClass="d-flex flex-column flex-1"
            txtAreaValue={props.subtask.description}
            onChange={(e) => {
              editedSubtasks[props.index].description = e.target.value;
              props.setNewTask({
                ...props.newTask,
                subtasks: [...editedSubtasks],
              });
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <div
        ref={optionsRef}
        className="position-absolute h-100 add-task-subtask-options my-color-lighter pe-2"
      >
        <div className="d-flex flex-row align-items-center h-100 gap-2">
          <ArrowIcon
            className="h-100"
            style={{ width: "20px", cursor: "pointer" }}
            onClick={() => {
              setOptionsOpened(!optionsOpened);
            }}
          />
          <div className="d-flex flex-row gap-2">
            <IconButton
              txt="Subtask"
              icon={<DeleteIcon className="regular-icon" />}
              buttonClass="btn-purple txt-small p-0 bg-transparent border-0 d-flex flex-row-reverse flex-1 justify-content-between align-items-center fw-semibold my-color-lighter"
              function={() => {
                deleteSubtask();
              }}
            />

            <IconButton
              txt="Description"
              icon={
                props.subtask.description !== undefined ? (
                  <DeleteIcon className="regular-icon" />
                ) : (
                  <RestoreIcon className="regular-icon" />
                )
              }
              buttonClass="btn-purple txt-small p-0 bg-transparent border-0 d-flex flex-row-reverse flex-1 justify-content-between align-items-center fw-semibold my-color-lighter"
              function={() => {
                setSubtaskDescription();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
