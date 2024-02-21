import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { useEffect, useRef, useState } from "react";
import { SubtaskType, useTasksContext } from "../../../../context/tasksContext";
import { editSubtask } from "../../../../utils/task-list/update/editSubtask";
import { useModalContext } from "../../../../context/modalContext";
import deleteSubtask from "../../../../utils/task-list/delete/deleteSubtask";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";

type EditSubtsakModalContent = {
  subtask: SubtaskType;
  index: number;
};

export default function EditSubtsakModalContent(
  props: EditSubtsakModalContent
) {
  const { currentTask, editedTask, setEditedTask } = useTasksContext();
  const { modalContext, setModalContext } = useModalContext();
  const [editedSubtask, setEditedSubtask] = useState<SubtaskType>(
    props.subtask
  );
  const prevEditedSubtaskRef = useRef<SubtaskType>();
  const [subtaskHasChanged, setSubtaskHasChanged] = useState<boolean>(false);

  prevEditedSubtaskRef.current = props.subtask;

  useEffect(() => {
    if (currentTask.subtasks[props.index]) {
      if (
        editedSubtask.title !== currentTask.subtasks[props.index].title ||
        editedSubtask.description !==
          currentTask.subtasks[props.index].description
      ) {
        setSubtaskHasChanged(true);
      } else {
        setSubtaskHasChanged(false);
      }
    }

    if (
      prevEditedSubtaskRef.current.title !== editedSubtask.title ||
      prevEditedSubtaskRef.current.description !== editedSubtask.description
    ) {
      setSubtaskHasChanged(true);
    } else {
      setSubtaskHasChanged(false);
    }
  }, [editedSubtask]);

  return (
    <>
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Edit subtask
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 border-0 my-bg-darker">
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          labelValue="Subtask title"
          inputType="text"
          inputPlaceholder="Subtask title..."
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          inputValue={editedSubtask.title}
          onChange={(e) => {
            setEditedSubtask({ ...editedSubtask, title: e.target.value });
          }}
        />
        <TxtAreaLabeled
          containerClass="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Subtask Description"
          placeholder="Subtask description..."
          labelClass="my-color-light fw-semibold mb-1"
          txtAreaClass="modal-description w-100 txt-small shadowHover shadowFocus my-bg-dark rounded border-0 my-color-light p-2 fw-semibold"
          txtAreaValue={editedSubtask.description}
          onChange={(e) => {
            setEditedSubtask({ ...editedSubtask, description: e.target.value });
          }}
        />
      </ModalBody>
      <ModalFooter className="my-bg-darker border-0 d-flex flex-row gap-4">
        <Button
          className={
            "fw-semibold btn-purple-outline my-color-lighter txt-small"
          }
          style={{ flex: 1 }}
          onClick={() => {
            setModalContext({
              ...modalContext,
              showModal: !modalContext.showModal,
            });
          }}
        >
          Close
        </Button>
        <Button
          className={`${
            !subtaskHasChanged
              ? "btn-purple my-color-lighter"
              : "bg-warning text-secondary"
          } border-0 fw-semibold txt-small`}
          style={{ flex: 1 }}
          onClick={() => {
            if (subtaskHasChanged) {
              editSubtask(editedTask, setEditedTask, editedSubtask);
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            } else {
              deleteSubtask(editedTask, setEditedTask, editedSubtask);
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            }
          }}
        >
          {subtaskHasChanged ? "Save Changes" : "Delete"}
        </Button>
      </ModalFooter>
    </>
  );
}
