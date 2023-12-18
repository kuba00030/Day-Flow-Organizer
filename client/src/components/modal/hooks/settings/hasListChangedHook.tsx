import { useEffect } from "react";
import { TaskListsType } from "../../../../types/CategoryListType";

export default function hasListChangedHook(
  originLists: TaskListsType,
  editedLists: TaskListsType,
  setListHasChanged: (changed: boolean) => void
) {
  useEffect(() => {
    if (editedLists.length > 0) {
      for (let i = 0; i < originLists.length; i++) {
        if (
          originLists[i].listName !== editedLists[i].listName ||
          originLists[i].listColor !== editedLists[i].listColor ||
          originLists[i].listActive !== editedLists[i].listActive
        ) {
          setListHasChanged(true);
          return;
        }
      }
      setListHasChanged(false);
    }
  }, [editedLists]);
}
