import { TaskListsType } from "../../types/CategoryListType";

export default function hasListChanged(
  originLists: TaskListsType,
  editedLists: TaskListsType,
  setHasListChanged: (hasChanged: boolean) => void
) {
  for (let i = 0; i < originLists.length; i++) {
    if (
      originLists[i].category !== editedLists[i].category ||
      originLists[i].color !== editedLists[i].color
    ) {
      console.log(editedLists[i].category);
      setHasListChanged(true);
      return;
    } else {
      setHasListChanged(false);
    }
  }
}
