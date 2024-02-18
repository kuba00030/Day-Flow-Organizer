import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import {
  SubtaskType,
  useTasksContext,
} from "../../../../../context/tasksContext";
import { useModalContext } from "../../../../../context/modalContext";
import EditSubtsakModalContent from "../../../../modal/subtask/edit-subtask/EditSubtaskModalContent";
import markSubtaskDone from "../../../../../utils/task-list/update/markSubtaskDone";

type TSubtask = {
  subtask: SubtaskType;
  reorderedSubtasks: SubtaskType[];
  index: number;
  animationData?: string;
};

export default function Subtask(props: TSubtask) {
  const { modalContext, setModalContext } = useModalContext();
  const { setEditedTask, editedTask } = useTasksContext();

  return (
    <div
      className="d-flex flex-column gap-1 border-0 rounded my-bg-dark shadowHover p-2"
      data-animation={props.animationData}
      style={{
        cursor: "pointer",
        position: "relative",
        maxHeight: "200px",
      }}
      onMouseUp={() => {
        setEditedTask({ ...editedTask, subtasks: props.reorderedSubtasks });
      }}
      onDoubleClick={() => {
        setModalContext({
          ...modalContext,
          modalContent: (
            <EditSubtsakModalContent
              subtask={props.subtask}
              index={props.index}
            />
          ),
          showModal: !modalContext.showModal,
        });
      }}
    >
      <div className="p-1 border-0 rounded my-color-light fw-semibold txt-small d-flex flex-row align-items-center">
        <span className="flex-1 text-truncate">{props.subtask.title}</span>

        <input
          type="checkbox"
          onDoubleClick={(e) => {
            e.stopPropagation();
          }}
          onChange={async () => {
            markSubtaskDone(editedTask, setEditedTask, props.index);
          }}
          checked={props.subtask.subtaskStatus}
          className="checkbox ms-2"
        />
      </div>

      {props.subtask.description !== "" ? (
        <div className="d-flex flex-row mt-1 gap-1 bg-transparent my-color-light fw-semibold txt-small overflow-hidden">
          <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
          <div className="my-scrollbar task-details-subtask-description">
            <span
              className={`ps-1 pe-1 fw-semibold txt-small `}
              style={{ wordBreak: "break-word" }}
            >
              {props.subtask.description}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
