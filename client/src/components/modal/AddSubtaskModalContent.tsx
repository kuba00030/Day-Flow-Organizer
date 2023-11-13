import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import InputLabeled from "../InputLabeled";
export default function AddSubtaskModal(props) {
  const [subtaskTitle, setSubtaskTitle] = useState<string>();
  const [subtastDescription, setSubtaskDescription] = useState<string>();
  return (
    <>
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">Add subtask</ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 ">
        <InputLabeled
          labelClass="text-secondary fw-semibold txt-small"
          label="Title"
          placeholder=""
          inputType="text"
          setStateOnChange={setSubtaskTitle}
        />
        <InputLabeled
          labelClass="text-secondary fw-semibold txt-small"
          label="Description"
          placeholder=""
          inputType="text"
          setStateOnChange={setSubtaskDescription}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={() => {
            if (subtaskTitle !== "" && subtastDescription !== "") {
              // update in db then on snapschot update list
              props.onHide();
            } else {
              props.onHide();
            }
          }}
        >
          {subtaskTitle !== "" && subtastDescription !== ""
            ? "Add subtask"
            : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
