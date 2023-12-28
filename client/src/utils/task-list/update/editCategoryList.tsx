import { TaskListType, TaskListsType } from "../../../types/CategoryListType";

export const editCategoryList = (
  listName: string,
  propertyToChange: string,
  newValue: string | boolean,
  taskLists: TaskListsType,
  setTaskLists: (lists: TaskListsType) => void
) => {
  setTaskLists(
    taskLists.map((list: TaskListType) => {
      if (list.listName === listName) {
        return {
          ...list,
          [propertyToChange]: newValue,
        };
      }
      return list;
    })
  );
};
