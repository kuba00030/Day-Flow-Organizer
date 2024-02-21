import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../../ui/inputs/InputLabeled";
import { useState } from "react";
import { useAuthContext } from "../../../context/authContext";
import { useModalContext } from "../../../context/modalContext";
import { TaskLists, useTasksContext } from "../../../context/tasksContext";
import addTaskList from "../../../utils/task-list/add/addTaskList";
import setTaskListDB from "../../../utils/api/post-data/post/setTaskListDB";

export type newList = {
  listName: string;
  listColor: string;
};

export default function AddNewListModalContent() {
  const { authContext } = useAuthContext();
  const { taskLists, setTaskLists } = useTasksContext();
  const { setModalContext, modalContext } = useModalContext();
  const [newList, setNewList] = useState<newList>({
    listName: "",
    listColor: "#563d7c",
  });

  const listAlreadyExists = (
    taskLists: TaskLists,
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
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Add new list
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-row gap-4 border-0 my-bg-darker">
        <InputLabeled
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          labelValue="List name"
          inputType="text"
          inputPlaceholder="New list"
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          inputValue={newList.listName}
          onChange={(e) => {
            setNewList({ ...newList, listName: e.target.value });
          }}
        />
        <InputLabeled
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          labelValue="List color"
          inputType="color"
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          inputValue={newList.listColor}
          onChange={(e) => {
            setNewList({ ...newList, listColor: e.target.value });
          }}
        />
      </ModalBody>
      <ModalFooter className="my-bg-darker border-0">
        <Button
          className={`${
            newList.listName !== "" ? "bg-warning text-secondary" : "btn-purple"
          } border-0 fw-semibold txt-small`}
          onClick={async () => {
            if (
              newList.listName !== "" &&
              listAlreadyExists(taskLists, newList.listName) === false
            ) {
              await setTaskListDB(authContext.userID, newList);
              addTaskList(taskLists, setTaskLists, newList);
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
          {newList.listName !== "" ? "Add list" : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
