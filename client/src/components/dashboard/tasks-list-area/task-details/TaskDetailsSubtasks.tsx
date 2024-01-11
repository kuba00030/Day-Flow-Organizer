import { Container } from "react-bootstrap";
import { Reorder } from "framer-motion";
import IconButton from "../../../ui/buttons/IconButton";
import AddSubtaskModalContent from "../../../modal/AddSubtaskModalContent";
import { MdAdd as AddIcon } from "react-icons/md";
import {
  SubtaskType,
  Task,
  useTasksContext,
} from "../../../../context/tasksContext";
import { useModalContext } from "../../../../context/modalContext";
import { useEffect, useState } from "react";
import Subtask from "./Subtask";

type TaskDetailsSubtasks = {
  task: Task;
  animationData?: string;
};

export default function TaskDetailsSubtasks(props: TaskDetailsSubtasks) {
  const { modalContext, setModalContext } = useModalContext();
  const { editedTask } = useTasksContext();
  const [reordered, setReordered] = useState<SubtaskType[]>(
    editedTask.subtasks
  );

  useEffect(() => {
    setReordered(editedTask.subtasks);
  }, [editedTask]);

  return (
    <Container className=" p-0 d-flex  flex-column overflow-hidden">
      <div className="bg-transparent text-dark-emphasis fw-bold txt-medium">
        <span>Subtasks:</span>
      </div>

      <IconButton
        icon={<AddIcon className="regular-icon" />}
        txt="Add subtask"
        buttonClass="d-flex flex-row align-items-center txt-small bg-transparent text-secondary fw-semibold border-0 rounded me-auto"
        function={() => {
          setModalContext({
            modalContent: <AddSubtaskModalContent />,
            showModal: !modalContext.showModal,
          });
        }}
      />

      <div
        className="d-flex flex-column my-scrollbar slideInRight opacity_0"
        data-animation={props.animationData}
      >
        <Reorder.Group
          axis="y"
          values={reordered}
          onReorder={setReordered}
          className="d-flex flex-column px-3 py-2 gap-4 "
          style={{
            overflow: "hidden",
            height: "100%",
          }}
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
