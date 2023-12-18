import { TaskListType, TaskListsType } from "../../types/CategoryListType";

export const editCategoryList = (
  categoryName: string,
  propertyToChange: string,
  newValue: string | boolean,
  taskLists: TaskListsType,
  setTaskLists: (lists: TaskListsType) => void
) => {
  setTaskLists(
    taskLists.map((list: TaskListType) => {
      if (list.listName === categoryName) {
        return {
          ...list,
          [propertyToChange]: newValue,
        };
      }
      return list;
    })
  );
};
