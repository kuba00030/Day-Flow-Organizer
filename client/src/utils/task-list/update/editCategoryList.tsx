import { TaskList, TaskLists } from "../../../context/tasksContext";


export const editCategoryList = (
  listName: string,
  propertyToChange: string,
  newValue: string | boolean,
  taskLists: TaskLists,
  setTaskLists: (lists: TaskLists) => void
) => {
  setTaskLists(
    taskLists.map((list: TaskList) => {
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
