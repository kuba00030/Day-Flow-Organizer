import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import InputLabeled from "../ui/inputs/InputLabeled";
import { useModalContext } from "../../context/modalContext";
import addSubtask from "../../utils/task-list/add/addSubtask";
import { SubtaskType, useTasksContext } from "../../context/tasksContext";

export default function AddSubtaskModalContent() {
  const { modalContext, setModalContext } = useModalContext();
  const { taskLists, currentTask, setCurrentTask } = useTasksContext();
  const [newSubtask, setNewSubtask] = useState<SubtaskType>({
    subtaskID: `${new Date().getTime()}`,
    title: "",
    description: "",
    subtaskStatus: false,
  });
  return (
    <>
      <ModalHeader>
        <ModalTitle id="contained-modal-title-vcenter">Add subtask</ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 ">
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-small"
          labelValue="Title"
          inputType="text"
          inputValue={newSubtask.title}
          inputStyle="border border-secondary-subtle shadowFocus shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          onChange={(e) => {
            setNewSubtask({ ...newSubtask, title: e.target.value });
          }}
        />
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-small"
          labelValue="Description"
          inputType="text"
          inputValue={newSubtask.description}
          inputStyle="border border-secondary-subtle shadowFocus shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          onChange={(e) => {
            setNewSubtask({ ...newSubtask, description: e.target.value });
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          className={`txt-small btn ${
            newSubtask.title !== "" ? "bg-warning text-secondary" : ""
          } border-0 fw-semibold`}
          onClick={() => {
            if (newSubtask.title !== "") {
              addSubtask(taskLists, currentTask, setCurrentTask, newSubtask);
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
