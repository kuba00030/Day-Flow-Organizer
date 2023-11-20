import {
  Alert,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";
import InputLabeled from "../ui/inputs/InputLabeled";
import { ModalContext } from "../../context/modalContext";
export default function AddSubtaskModalContent() {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [subtaskTitle, setSubtaskTitle] = useState<string>("");
  const [subtastDescription, setSubtaskDescription] = useState<string>("");
  return (
    <>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">Add subtask</ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 ">
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-small"
          labelValue="Title"
          inputType="text"
          inputValue={subtaskTitle}
          inputStyle="border border-secondary-subtle  focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          onChange={(e) => {
            setSubtaskTitle(e.target.value);
          }}
        />
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-small"
          labelValue="Description"
          inputType="text"
          inputValue={subtastDescription}
          inputStyle="border border-secondary-subtle  focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          onChange={(e) => {
            setSubtaskDescription(e.target.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          className="txt-small"
          onClick={() => {
            if (subtaskTitle !== "" && subtastDescription !== "") {
              // update in db then on snapschot update list
              setShowModal(!showModal);
            } else {
              <Alert variant="danger">Fill in title and description</Alert>;
            }
          }}
        >
          Add subtask
        </Button>
      </ModalFooter>
    </>
  );
}
