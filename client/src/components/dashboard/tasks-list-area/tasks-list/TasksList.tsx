import { TaskList } from "../../../../context/tasksContext";
import renderTaskList from "../../../../utils/task-list/render/renderTaskList";

type TasksList = {
  list: TaskList;
};

export default function TasksList(props: TasksList) {
  return (
    <div className="d-flex flex-column gap-4 flex-1">
      {renderTaskList(props.list)}
    </div>
  );
}
