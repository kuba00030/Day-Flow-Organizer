import {
  MainTaskChangesType,
  SubtaskType,
  TaskType,
} from "../../types/TaskType";

export const compareTaskChanges = (
  taskChanges: MainTaskChangesType,
  taskDetails: TaskType,
  setHasTaskChanged: (val: boolean) => void
) => {
  for (const key in taskChanges) {
    if (taskChanges[key] !== taskDetails[key]) {
      setHasTaskChanged(true);
      return;
    }
    setHasTaskChanged(false);
  }
};
export const compareSubtaskChanges = (
  changedSubtasks: SubtaskType[],
  originSubtaks: SubtaskType[],
  setHasTaskChanged: (val: boolean) => void
) => {
  // check if any subtask was deleted or added
  if (changedSubtasks.length !== originSubtaks.length) {
    setHasTaskChanged(true);
    return;
  }
  // check if any property of subtask was changed
  for (let i = 0; i < changedSubtasks.length; i++) {
    if (
      JSON.stringify(changedSubtasks[i]) !== JSON.stringify(originSubtaks[i])
    ) {
      setHasTaskChanged(true);
      return;
    }
  }

  setHasTaskChanged(false);
};
