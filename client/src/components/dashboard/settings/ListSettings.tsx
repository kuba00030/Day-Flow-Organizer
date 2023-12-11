import { editCategoryList } from "../../../utils/task-list/editCategoryList";
import InputLabeled from "../../ui/inputs/InputLabeled";
import { MdDeleteForever as DeleteSubtaskIcon } from "react-icons/md";
import { TaskListType, TaskListsType } from "../../../types/CategoryListType";

type TListSettings = {
  list: TaskListType;
  index: number;
  setListHasChanged: (hasChanged: boolean) => void;
  editedLists: TaskListsType;
  setEditedLists: (editedLists: TaskListsType) => void;
};

export default function ListSettings(props: TListSettings) {
  return (
    <div
      className="d-flex flex-row gap-4 align-items-center"
      key={`Edit tasks list ${props.index}`}
    >
      <InputLabeled
        inputType="text"
        inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
        inputValue={props.list.category}
        onChange={(e) => {
          editCategoryList(
            props.list.category,
            "category",
            e.target.value,
            props.editedLists,
            props.setEditedLists
          );
          // updateTaskListDB(userID, e.target.value, category.color);
        }}
      />
      <InputLabeled
        inputType="color"
        inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
        inputValue={props.list.color}
        onChange={(e) => {
          editCategoryList(
            props.list.category,
            "color",
            e.target.value,
            props.editedLists,
            props.setEditedLists
          );
          // props.setEditedLists()
        }}
      />
      <DeleteSubtaskIcon
        type="button"
        className="ms-1 mt-1 regular-icon text-secondary"
        onClick={() => {
          props.setEditedLists(
            props.editedLists.filter((list, index) => index !== props.index)
          );
        }}
      >
        Delete
      </DeleteSubtaskIcon>
    </div>
  );
}
