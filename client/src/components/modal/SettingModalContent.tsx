import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../ui/inputs/InputLabeled";
import { useState, useEffect, useContext } from "react";
import { TasksContext } from "../../context/tasksContext";
import { CategoryType } from "../../types/CategoryListType";
import { editCategoryList } from "../../utils/task-details/editCategoryList";

export default function SettingsModalContent() {
  const { categoryList, setCategoryList } = useContext(TasksContext);
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
          categoryList.map((category: CategoryType) => {
            return (
              <div className="d-flex flex-row gap-4 ">
                <InputLabeled
                  inputType="text"
                  inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
                  inputValue={category.category}
                  onChange={(e) => {
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
