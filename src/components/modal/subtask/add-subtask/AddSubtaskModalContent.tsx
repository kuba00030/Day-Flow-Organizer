import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { useModalContext } from "../../../../context/modalContext";
import addSubtask from "../../../../utils/task-list/add/addSubtask";
import { SubtaskType, useTasksContext } from "../../../../context/tasksContext";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";

export default function AddSubtaskModalContent() {
  const { modalContext, setModalContext } = useModalContext();
  const { editedTask, setEditedTask } = useTasksContext();
  const [newSubtask, setNewSubtask] = useState<SubtaskType>({
    subtaskID: `${new Date().getTime()}`,
    title: "",
    description: "",
    subtaskStatus: false,
  });

  return (
    <>
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Add subtask
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 border-0 my-bg-darker modal-body overflow-auto">
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          labelValue="Subtask title"
          inputType="text"
          inputPlaceholder="Subtask title..."
          inputValue={newSubtask.title}
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          onChange={(e) => {
            setNewSubtask({ ...newSubtask, title: e.target.value });
          }}
        />
        <TxtAreaLabeled
          containerClass="fw-semibold d-flex flex-column flex-grow-1 gap-2"
          labelValue="Subtask Description"
          placeholder="Subtask description..."
          labelClass="my-color-light fw-semibold mb-1"
          inputWrapperClass="d-flex flex-grow-1 shadowHover shadowFocus rounded my-bg-dark overflow-hidden p-2"
          txtAreaClass="flex-grow-1 txt-small  border-0 bg-transparent my-color-light fw-semibold overflow-auto"
          txtAreaValue={newSubtask.description}
          onChange={(e) => {
            setNewSubtask({ ...newSubtask, description: e.target.value });
          }}
        />
      </ModalBody>
      <ModalFooter className="my-bg-darker border-0">
        <Button
          className={`txt-small btn ${
            newSubtask.title !== ""
              ? "bg-warning text-secondary"
              : "btn-purple my-color-lighter"
          } border-0 fw-semibold`}
          onClick={() => {
            if (newSubtask.title !== "") {
              addSubtask(editedTask, setEditedTask, newSubtask);
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            } else {
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            }
          }}
        >
          {newSubtask.title !== "" ? "Add" : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
