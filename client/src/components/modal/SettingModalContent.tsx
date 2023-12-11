import { Button, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { useState, useEffect, useContext, useRef } from "react";
import { TasksContext } from "../../context/tasksContext";
import updateTaskListDB from "../../utils/api/post-data/update/updateTaskListDB";
import { AuthContext } from "../../context/authContext";
import { ModalContext } from "../../context/modalContext";
import { TaskListsType } from "../../types/CategoryListType";
import ListSettings from "../dashboard/settings/ListSettings";
import hasListChanged from "../../utils/settings/hasListChanged";

export default function SettingsModalContent() {
  const { categoryList, setCategoryList } = useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  const { setShowModal, showModal } = useContext(ModalContext);
  const [editedLists, setEditedLists] = useState<TaskListsType>([]);
  const [listHasChanged, setListHasChanged] = useState(false);

  useEffect(() => {
    setEditedLists(categoryList);
  }, [categoryList]);
  useEffect(() => {
    if (editedLists.length) {
      hasListChanged(categoryList, editedLists, setListHasChanged);
    }
  }, [editedLists]);
  useEffect(() => {
    console.log(listHasChanged);
  }, [listHasChanged]);
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
                if (listHasChanged === false) {
                  setShowModal(!showModal);
                } else {
                  categoryList.forEach((list, index) => {
                    if (list.category !== editedLists[index].category) {
                      updateTaskListDB(
                        userID,
                        list.category,
                        editedLists[index].category,
                        editedLists[index].color,
                        editedLists[index].tasks
                      );
                      console.log(editedLists[index]);
                    }
                  });
                  setShowModal(!showModal);
                  setCategoryList(editedLists);
                  console.log("list changed");
                }
              }}
            >
              {listHasChanged === false ? "Close" : "Confirm changes"}
            </Button>
          </>
        ) : (
          <div className="text-center text-secondary fw-semibold txt-small">
            Add your first tasks list
          </div>
        )}
      </ModalBody>
    </>
  );
}
