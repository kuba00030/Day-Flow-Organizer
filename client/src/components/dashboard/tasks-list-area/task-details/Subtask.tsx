import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import { SubtaskType } from "../../../../context/tasksContext";
import { useModalContext } from "../../../../context/modalContext";
import EditSubtsakModalContent from "../../../modal/EditSubtaskModalContent";
type TSubtask = {
  subtask: SubtaskType;
  index: number;
};
export default function Subtask(props: TSubtask) {
  const { modalContext, setModalContext } = useModalContext();
  return (
    <div
      className="d-flex flex-column gap-1 border border-secondary-subtle rounded shadowHover slideInRight opacity_0"
      onClick={() => {
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
      <div
        className={`p-1 ${
          props.subtask.title
            ? "border-0"
            : "border border-secondary-subtle rounded"
        } bg-transparent text-secondary fw-semibold txt-small d-flex`}
        style={{ flex: 1 }}
      >
        <span className="text-secondary">{props.subtask.title}</span>
      </div>

      {props.subtask.description !== "" &&
      props.subtask.description !== undefined ? (
        <div className="d-flex flex-row mt-1 gap-1 w-100  bg-transparent text-secondary fw-semibold txt-small d-flex ">
          <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
          <div className="d-flex" style={{ flex: 1, overflowX: "hidden" }}>
            <span
              className={` w-100 ps-1 pe-1  text-secondary fw-semibold txt-small`}
              style={{ flex: 1, wordWrap: "break-word", outline: "none" }}
            >
              {props.subtask.description}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
