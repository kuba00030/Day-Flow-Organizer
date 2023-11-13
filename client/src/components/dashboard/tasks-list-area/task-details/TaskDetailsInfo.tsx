import { Container } from "react-bootstrap";
import { editTaskValue } from "../../../../utils/task-details/EditTaskValue";
import { MainTaskChangesType, TaskType } from "../../../../types/TaskType";
import { useContext } from "react";
import { TasksContext } from "../../../../context/tasksContext";

type TTaskDetailsInfo = {
  taskProperty: string;
  date: string;
  task: MainTaskChangesType;
  setTask: (task: TaskType) => void;
};
export default function TaskDetailsInfo(props: TTaskDetailsInfo) {
  const { categoryList, setCategoryList } = useContext(TasksContext);

  return (
    <Container className="p-0 d-flex flex-column gap-1">
      <Container className="d-flex flex-row w-100 justify-content-between">
        <div>
          <span className="text-secondary fw-semibold dashboard-tasks-details-txt">
            List
          </span>
        </div>
        <select className="dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary">
          {categoryList.map((category): React.ReactNode => {
            return (
              <option className="text-secondary fw-semibold dashboard-tasks-details-txt">
                {category}
              </option>
            );
          })}
        </select>
      </Container>
      <Container className="d-flex flex-row w-100 justify-content-between">
        <div>
          <span className="text-secondary fw-semibold dashboard-tasks-details-txt">
            Due date
          </span>
        </div>
        <input
          type="date"
          value={props.date}
          onChange={(e) => {
            editTaskValue(props.task, props.setTask, props.taskProperty, e);
          }}
          className="dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary"
        />
      </Container>
    </Container>
  );
}
