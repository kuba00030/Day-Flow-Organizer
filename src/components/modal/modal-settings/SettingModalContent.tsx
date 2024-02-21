import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { TaskLists, TasksContext } from "../../../context/tasksContext";
import updateTaskListDB from "../../../utils/api/post-data/update/updateTaskListDB";
import { useAuthContext } from "../../../context/authContext";
import { useModalContext } from "../../../context/modalContext";
import ListSettings from "../../dashboard/settings/ListSettings";
import hasListChangedHook from "./hook/hasListChangedHook";
import deleteList from "../../../utils/task-list/delete/deleteList";

export default function SettingsModalContent() {
  const { taskLists, setTaskLists, setCurrentList } = useContext(TasksContext);
  const { authContext } = useAuthContext();
  const { modalContext, setModalContext } = useModalContext();
  const [editedLists, setEditedLists] = useState<TaskLists>([]);
  const [listHasChanged, setListHasChanged] = useState(false);

  useEffect(() => {
    setEditedLists(taskLists);
  }, [taskLists]);

  hasListChangedHook(taskLists, editedLists, setListHasChanged);

  return (
    <>
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Edit lists
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 border-0 my-bg-darker">
        {editedLists.length > 0 ? (
          <>
            {editedLists.map((list, index: number) => {
              return (
                <ListSettings
                  key={`list ${index}`}
                  list={list}
                  index={index}
                  listActive={list.listActive}
                  setListHasChanged={setListHasChanged}
                  editedLists={editedLists}
                  setEditedLists={setEditedLists}
                />
              );
            })}
          </>
        ) : (
          <div className="text-center my-color-light fw-semibold txt-small">
            Add your first list
          </div>
        )}
      </ModalBody>
      <ModalFooter className="my-bg-darker border-0">
        <Button
          type="button"
          className={`${
            listHasChanged === false
              ? "btn-purple"
              : "bg-warning text-secondary"
          } border-0 fw-semibold txt-small`}
          onClick={async () => {
            if (listHasChanged === true) {
              await updateTaskListDB(
                authContext.userID,
                taskLists,
                editedLists
              );
              deleteList(editedLists, setTaskLists, setCurrentList);
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
          {listHasChanged === false ? "Close" : "Save changes"}
        </Button>
      </ModalFooter>
    </>
  );
}
