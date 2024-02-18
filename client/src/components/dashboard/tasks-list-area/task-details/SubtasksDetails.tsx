import { Container } from "react-bootstrap";
import { Reorder } from "framer-motion";
import AddSubtaskModalContent from "../../../modal/subtask/add-subtask/AddSubtaskModalContent";
import { SubtaskType, useTasksContext } from "../../../../context/tasksContext";
import { useModalContext } from "../../../../context/modalContext";
import { useEffect, useState } from "react";
import Subtask from "./subtask-details/Subtask";
import AddButton from "../../../ui/buttons/AddButton";

type SubtasksDetails = {
  animationData?: string;
};

export default function SubtasksDetails(props: SubtasksDetails) {
  const { modalContext, setModalContext } = useModalContext();
  const { editedTask } = useTasksContext();
  const [reordered, setReordered] = useState<SubtaskType[]>(
    editedTask.subtasks
  );

  useEffect(() => {
    setReordered(editedTask.subtasks);
  }, [editedTask]);

  return (
    <Container className="p-0 d-flex flex-column flex-1 gap-4">
      <div className="my-color-light fw-bold txt-medium">
        <span>Subtasks:</span>
      </div>

      <AddButton
        txt="Add subtask"
        buttonClass="txt-small me-auto"
        onClick={() => {
          setModalContext({
            modalContent: <AddSubtaskModalContent />,
            showModal: !modalContext.showModal,
          });
        }}
      />

      <div
        className="d-flex flex-column slideInRight opacity_0"
        data-animation={props.animationData}
      >
        <Reorder.Group
          axis="y"
          values={reordered}
          onReorder={setReordered}
          className="d-flex flex-column p-2 gap-4 "
        >
          {reordered.map((subtask, index: number): React.ReactNode => {
            return (
              <Reorder.Item value={subtask} key={subtask.subtaskID}>
                <Subtask
                  subtask={subtask}
                  reorderedSubtasks={reordered}
                  index={index}
                  key={`subtask ${index}`}
                  animationData={props.animationData}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      </div>
    </Container>
  );
}
