import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../ui/inputs/InputLabeled";
import { useState, useEffect } from "react";
export default function AddNewListModalContent() {
  const [newList, setNewList] = useState<string>("");
  const [colorList, setColorList] = useState<string>("#563d7c");
  useEffect(() => {
    console.log(colorList);
  }, [colorList]);
  return (
    <>
      <ModalHeader closeButton>
        <ModalTitle
          id="contained-modal-title-vcenter"
          className=" text-dark-emphasis fw-semibold"
        >
          Add new list
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-row gap-4 ">
        <InputLabeled
          labelStyle="fs-lg text-secondary fw-semibold mb-1 "
          labelValue="List name"
          inputType="text"
          inputPlaceholder="New list"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={newList}
          onChange={(e) => {
            setNewList(e.target.value);
          }}
        />
        <InputLabeled
          labelStyle="fs-lg text-secondary fw-semibold mb-1"
          labelValue="List color"
          inputType="color"
          inputStyle=""
          inputValue={colorList}
          onChange={(e) => {
            setColorList(e.target.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button size="sm">Add list</Button>
      </ModalFooter>
    </>
  );
}
