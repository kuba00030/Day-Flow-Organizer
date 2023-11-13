import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useState } from "react";
import { SubtaskType } from "../../types/TaskType";
import InputLabeled from "../InputLabeled";
export default function AddTaskModalContent() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [list, setList] = useState<string>("");
  const [subtasks, setSubtasks] = useState<SubtaskType[]>();
  const [subtast, setSubtask] = useState<SubtaskType>();
  return (
    <>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">Add subtask</ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 ">
        <InputLabeled
          labelClass="text-secondary fw-semibold txt-small"
          label="Title"
          placeholder="Task title"
          inputType="text"
          setStateOnChange={setTitle}
        />
        <InputLabeled
          labelClass="text-secondary fw-semibold txt-small"
          label="Description"
          placeholder="Task description"
          inputType="text"
          setStateOnChange={setDescription}
        />
        {/* pick the list */}
        <InputLabeled
          labelClass="text-secondary fw-semibold txt-small"
          label="Description"
          placeholder=""
          inputType="data"
          setStateOnChange={setDate}
        />
      </ModalBody>
      <ModalFooter>
        <Button></Button>
      </ModalFooter>
    </>
  );
}
