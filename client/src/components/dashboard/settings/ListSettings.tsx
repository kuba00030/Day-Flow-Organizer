import { TaskList, TaskLists } from "../../../context/tasksContext";
import { editCategoryList } from "../../../utils/task-list/update/editCategoryList";
import InputLabeled from "../../ui/inputs/InputLabeled";
import { MdDeleteForever as DeleteListIcon } from "react-icons/md";
import { MdRestoreFromTrash as RestoreListIcon } from "react-icons/md";

type TListSettings = {
  list: TaskList;
  index: number;
  listActive: boolean | string;
  setListHasChanged: (hasChanged: boolean) => void;
  editedLists: TaskLists;
  setEditedLists: (editedLists: TaskLists) => void;
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
        inputValue={props.list.listName}
        onChange={(e) => {
          editCategoryList(
            props.list.listName,
            "listName",
            e.target.value,
            props.editedLists,
            props.setEditedLists
          );
        }}
      />
      <InputLabeled
        inputType="color"
        inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
        inputValue={props.list.listColor}
        onChange={(e) => {
          editCategoryList(
            props.list.listName,
            "listColor",
            e.target.value,
            props.editedLists,
            props.setEditedLists
          );
        }}
      />
      {props.listActive ? (
        <DeleteListIcon
          type="button"
          className="ms-1 mt-1 large-icon text-secondary"
          onClick={() => {
            editCategoryList(
              props.list.listName,
              "listActive",
              !props.listActive,
              props.editedLists,
              props.setEditedLists
            );
          }}
        />
      ) : (
        <RestoreListIcon
          type="button"
          className="ms-1 mt-1 large-icon text-secondary"
          onClick={() => {
            editCategoryList(
              props.list.listName,
              "listActive",
              !props.listActive,
              props.editedLists,
              props.setEditedLists
            );
          }}
        />
      )}
    </div>
  );
}
