import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../ui/inputs/InputLabeled";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ModalContext } from "../../context/modalContext";
import { TasksContext } from "../../context/tasksContext";
import addNewTasksListDB from "../../utils/api/post-data/post/addNewTasksListDB";
export default function AddNewListModalContent() {
  const { userID } = useContext(AuthContext);
  const { setCategoryList, categoryList } = useContext(TasksContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [newList, setNewList] = useState<string>("");
  const [colorList, setColorList] = useState<string>("#563d7c");
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
        <Button
          size="sm"
          onClick={() => {
            if (newList !== "" && colorList !== "#563d7c") {
              addNewTasksListDB(newList, colorList, userID);
              setShowModal(!showModal);
              setCategoryList([
                ...categoryList,
                { category: newList, color: colorList, tasks: [] },
              ]);
            } else {
              setShowModal(!showModal);
            }
          }}
        >
          {newList !== "" && colorList !== "#563d7c" ? "Add list" : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
