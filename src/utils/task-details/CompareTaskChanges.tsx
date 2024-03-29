import { Note } from "../../context/noteContext";
import { Task } from "../../context/tasksContext";

export const compareTaskChanges = (
  editedTask: Task | Note,
  originTask: Task | Note,
  setHasTaskChanged: (val: boolean) => void
) => {
  for (const property in editedTask) {
    if (
      editedTask[property] !== originTask[property] &&
      property !== "subtasks"
    ) {
      setHasTaskChanged(true);
      return;
    }
    if (property === "subtasks") {
      if (editedTask[property].length !== originTask[property].length) {
        setHasTaskChanged(true);
        return;
      }
      for (const subtask in editedTask[property]) {
        const editedSubtask = editedTask[property][subtask];
        const originSubtask = originTask[property][subtask];
        if (
          editedSubtask.description !== originSubtask.description ||
          editedSubtask.title !== originSubtask.title ||
          editedSubtask.subtaskStatus !== originSubtask.subtaskStatus
        ) {
          setHasTaskChanged(true);
          return;
        }
      }
      return;
    }
    setHasTaskChanged(false);
  }
};
