import { Button, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { TaskLists, TasksContext } from "../../context/tasksContext";
import updateTaskListDB from "../../utils/api/post-data/update/updateTaskListDB";
import { useAuthContext } from "../../context/authContext";
import { useModalContext } from "../../context/modalContext";
import ListSettings from "../dashboard/settings/ListSettings";
import hasListChangedHook from "./hooks/settings/hasListChangedHook";

export default function SettingsModalContent() {
  const { taskLists, setTaskLists } = useContext(TasksContext);
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
            <Button
              type="button"
              className={`${
                listHasChanged === false
                  ? "bg-primary "
                  : "bg-warning text-secondary"
              } border-0 fw-semibold`}
              onClick={async () => {
                if (listHasChanged === true) {
                  await updateTaskListDB(
                    authContext.userID,
                    taskLists,
                    editedLists
                  );
                  setModalContext({
                    ...modalContext,
                    showModal: !modalContext.showModal,
                  });
                  setTaskLists(editedLists);
                } else {
                  setModalContext({
                    ...modalContext,
                    showModal: !modalContext.showModal,
                  });
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
