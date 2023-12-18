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
import addTaskListDB from "../../utils/api/post-data/post/addTaskListDB";
import addTaskList from "../../utils/task-list/addTaskList";
export default function AddNewListModalContent() {
  const { userID } = useContext(AuthContext);
  const { setTaskLists, taskLists } = useContext(TasksContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [newListName, setNewListName] = useState<string>("");
  const [newColorList, setnewColorList] = useState<string>("#563d7c");
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
          inputValue={newListName}
          onChange={(e) => {
            setNewListName(e.target.value);
          }}
        />
        <InputLabeled
          labelStyle="fs-lg text-secondary fw-semibold mb-1"
          labelValue="List color"
          inputType="color"
          inputStyle=""
          inputValue={newColorList}
          onChange={(e) => {
            setnewColorList(e.target.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onClick={async () => {
            if (newListName !== "" && newColorList !== "#563d7c") {
              const newListID = new Date().getTime();
              await addTaskListDB(
                newListName,
                newColorList,
                userID,
                `${newListID}`
              );
              setShowModal(!showModal);
              addTaskList(
                taskLists,
                setTaskLists,
                newListName,
                newColorList,
                newListID
              );
            } else {
              setShowModal(!showModal);
            }
          }}
        >
          {newListName !== "" && newColorList !== "#563d7c"
            ? "Add list"
            : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
