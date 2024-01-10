import Subtask from "../../../components/dashboard/tasks-list-area/task-details/Subtask";
import { SubtaskType } from "../../../context/tasksContext";

export default function renderSubtasks(
  subtasks: SubtaskType[]
): React.ReactNode {
  return subtasks !== undefined
    ? subtasks.map((subtask: SubtaskType, index) => {
        return (
          <Subtask subtask={subtask} index={index} key={`subtask ${index}`} />
        );
      })
    : null;
}
