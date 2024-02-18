import { TaskList, TaskLists } from "../../../context/tasksContext";
import { editList } from "../../../utils/task-list/update/editList";
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
        labelStyle="my-color-light fw-semibold mb-1 txt-small"
        labelValue="List name"
        inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
        inputValue={props.list.listName}
        onChange={(e) => {
          editList(
            props.list.listName,
            "listName",
            e.target.value,
            props.editedLists,
            props.setEditedLists
          );
        }}
      />
      <InputLabeled
        labelValue="List color"
        inputType="color"
        labelStyle="my-color-light fw-semibold mb-1 txt-small"
        inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
        inputValue={props.list.listColor}
        onChange={(e) => {
          editList(
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
          className={`ms-1 mt-1 large-icon icon-light ${
            props.listActive ? "" : "icon-danger"
          }`}
          onClick={() => {
            editList(
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
          className={`ms-1 mt-1 large-icon icon-light ${
            props.listActive ? "" : "icon-danger"
          }`}
          onClick={() => {
            editList(
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
