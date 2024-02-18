import { useEffect, useState } from "react";
import { compareTaskChanges } from "../utils/task-details/CompareTaskChanges";
import { Task } from "../context/tasksContext";

export function useCompareTasks(currentTask: Task, editedTask: Task) {
  const [taskHasChanged, setTaskHasChanged] = useState<boolean>(false);

  useEffect(() => {
    compareTaskChanges(currentTask, editedTask, setTaskHasChanged);
  }, [editedTask]);

  return taskHasChanged;
}
