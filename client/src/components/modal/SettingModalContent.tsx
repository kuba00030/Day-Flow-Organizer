import { Button, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { TasksContext } from "../../context/tasksContext";
import updateTaskListDB from "../../utils/api/post-data/update/updateTaskListDB";
import { AuthContext } from "../../context/authContext";
import { ModalContext } from "../../context/modalContext";
import { TaskListsType } from "../../types/CategoryListType";
import ListSettings from "../dashboard/settings/ListSettings";
import hasListChangedHook from "./hooks/settings/hasListChangedHook";

export default function SettingsModalContent() {
  const { taskLists, setTaskLists } = useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  const { setShowModal, showModal } = useContext(ModalContext);
  const [editedLists, setEditedLists] = useState<TaskListsType>([]);
  const [listHasChanged, setListHasChanged] = useState(false);

  useEffect(() => {
    setEditedLists(taskLists);
  }, [taskLists]);
  hasListChangedHook(taskLists, editedLists, setListHasChanged);
  return (
    <>
      <ModalHeader>
        <ModalTitle
          id="contained-modal-title-vcenter"
          className=" text-dark-emphasis fw-semibold"
        >
          Edit lists
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 ">
        {editedLists.length > 0 ? (
          <>
            {editedLists.map((list, index: number) => {
              return (
                <ListSettings
                  list={list}
                  index={index}
                  listActive={list.listActive}
                  setListHasChanged={setListHasChanged}
                  editedLists={editedLists}
                  setEditedLists={setEditedLists}
                />
              );
            })}
            <Button
              type="button"
              className={`${
                listHasChanged === false
                  ? "bg-primary "
                  : "bg-warning text-secondary"
              } border-0 fw-semibold`}
              onClick={async () => {
                if (listHasChanged === true) {
                  await updateTaskListDB(userID, taskLists, editedLists);
                  setShowModal(!showModal);
                  setTaskLists(editedLists);
                } else {
                  setShowModal(!showModal);
                }
              }}
            >
              {listHasChanged === false ? "Close" : "Confirm changes"}
            </Button>
          </>
        ) : (
          <div className="text-center text-secondary fw-semibold txt-small">
            Add your first list
          </div>
        )}
      </ModalBody>
    </>
  );
}
