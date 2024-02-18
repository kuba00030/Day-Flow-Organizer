import { useEffect } from "react";
import { TaskLists } from "../../../../context/tasksContext";

export default function hasListChangedHook(
  originLists: TaskLists,
  editedLists: TaskLists,
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
