import {
  Button,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../ui/inputs/InputLabeled";
import { useEffect, useState } from "react";
import { SubtaskType, useTasksContext } from "../../context/tasksContext";
import { editSubtask } from "../../utils/task-list/update/editSubtask";
import { useModalContext } from "../../context/modalContext";
import deleteSubtask from "../../utils/task-list/delete/deleteSubtask";

type EditSubtsakModalContent = {
  subtask: SubtaskType;
  index: number;
};

export default function EditSubtsakModalContent(
  props: EditSubtsakModalContent
) {
  const { currentTask, setCurrentTask } = useTasksContext();
  const { modalContext, setModalContext } = useModalContext();
  const [editedSubtask, setEditedSubtask] = useState<SubtaskType>(
    props.subtask
  );

  const [subtaskHasChanged, setSubtaskHasChanged] = useState<boolean>(false);

  useEffect(() => {
    {
      editedSubtask.title !== currentTask.subtasks[props.index].title ||
      editedSubtask.description !==
        currentTask.subtasks[props.index].description
        ? setSubtaskHasChanged(true)
        : setSubtaskHasChanged(false);
    }
  }, [editedSubtask]);
  return (
    <>
      <ModalHeader>
        <ModalTitle
          id="contained-modal-title-vcenter"
          className=" text-dark-emphasis fw-semibold"
        >
          Edit subtask
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 ">
        <InputLabeled
          labelStyle="fs-lg text-secondary fw-semibold mb-1 "
          labelValue="Title"
          inputType="text"
          inputPlaceholder="New list"
          inputStyle="border border-dark-subtle shadowFocus shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={editedSubtask.title}
          onChange={(e) => {
            setEditedSubtask({ ...editedSubtask, title: e.target.value });
          }}
        />
        <InputLabeled
          labelStyle="fs-lg text-secondary fw-semibold mb-1"
          labelValue="Description"
          inputType="text"
          inputStyle="border border-dark-subtle shadowFocus shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={editedSubtask.description}
          onChange={(e) => {
            setEditedSubtask({ ...editedSubtask, description: e.target.value });
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Container className="d-flex flex-row gap-4">
          <Button
            size="sm"
            className={"btn text-secondaryborder-0 fw-semibold"}
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
            size="sm"
            className={`${
              !subtaskHasChanged ? "btn" : "bg-warning text-secondary"
            } border-0 fw-semibold`}
            style={{ flex: 1 }}
            onClick={() => {
              if (subtaskHasChanged) {
                editSubtask(currentTask, setCurrentTask, editedSubtask);
                setModalContext({
                  ...modalContext,
                  showModal: !modalContext.showModal,
                });
              } else {
                deleteSubtask(currentTask, setCurrentTask, editedSubtask);
                setModalContext({
                  ...modalContext,
                  showModal: !modalContext.showModal,
                });
              }
            }}
          >
            {subtaskHasChanged ? "Save Changes" : "Delete"}
          </Button>
        </Container>
      </ModalFooter>
    </>
  );
}
