import { ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import InputLabeled from "../ui/inputs/InputLabeled";
import { useState, useEffect, useContext } from "react";
import { TasksContext } from "../../context/tasksContext";
import { TaskListType } from "../../types/CategoryListType";
import { editCategoryList } from "../../utils/task-details/editCategoryList";
import updateTaskListDB from "../../utils/api/post-data/update/updateTaskListDB";
import { AuthContext } from "../../context/authContext";

export default function SettingsModalContent() {
  const { categoryList, setCategoryList } = useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  return (
    <>
      <ModalHeader closeButton>
        <ModalTitle
          id="contained-modal-title-vcenter"
          className=" text-dark-emphasis fw-semibold"
        >
          Edit lists
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 ">
        {categoryList.length > 0 ? (
          categoryList.map((category: TaskListType, index: number) => {
            return (
              <div
                className="d-flex flex-row gap-4 "
                key={`Edit tasks list ${index}`}
              >
                <InputLabeled
                  inputType="text"
                  inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
                  inputValue={category.category}
                  onChange={(e) => {
                    updateTaskListDB(userID, e.target.value, category.color);
                    editCategoryList(
                      category.category,
                      "category",
                      e.target.value,
                      categoryList,
                      setCategoryList
                    );
                  }}
                />
                <InputLabeled
                  inputType="color"
                  inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
                  inputValue={category.color}
                  onChange={(e) => {
                    updateTaskListDB(userID, category.category, e.target.value);
                    editCategoryList(
                      category.category,
                      "color",
                      e.target.value,
                      categoryList,
                      setCategoryList
                    );
                  }}
                />
              </div>
            );
          })
        ) : (
          <div className="text-center text-secondary fw-semibold txt-small">
            Add your first tasks list
          </div>
        )}
      </ModalBody>
    </>
  );
}
