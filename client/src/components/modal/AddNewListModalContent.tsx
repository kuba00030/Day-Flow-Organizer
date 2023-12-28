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
import addTaskList from "../../utils/task-list/add/addTaskList";
import { TaskListsType } from "../../types/CategoryListType";
export default function AddNewListModalContent() {
  const { userID } = useContext(AuthContext);
  const { setTaskLists, taskLists } = useContext(TasksContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [newListName, setNewListName] = useState<string>("");
  const [newColorList, setNewColorList] = useState<string>("#563d7c");

  const listAlreadyExists = (
    taskLists: TaskListsType,
    newListName: string
  ): boolean => {
    let listExists: boolean = false;
    if (taskLists.length) {
      for (let i = 0; i < taskLists.length; i++) {
        if (taskLists[i].listName === newListName) listExists = true;
      }
    }
    return listExists;
  };
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
            setNewColorList(e.target.value);
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onClick={async () => {
            if (
              newListName !== "" &&
              listAlreadyExists(taskLists, newListName) === false
            ) {
              await addTaskListDB(newListName, newColorList, userID);
              addTaskList(taskLists, setTaskLists, newListName, newColorList);
              setShowModal(!showModal);
            } else {
              setShowModal(!showModal);
            }
          }}
        >
          {newListName !== "" ? "Add list" : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
