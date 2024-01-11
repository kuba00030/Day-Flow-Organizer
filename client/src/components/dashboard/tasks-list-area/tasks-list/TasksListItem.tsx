import { Button, Container } from "react-bootstrap";
import { IoIosArrowUp as ArrowIcon } from "react-icons/io";
import { BsFillCalendar2XFill as DateIcon } from "react-icons/bs";
import { Task, useTasksContext } from "../../../../context/tasksContext";
import styleSelectedElement from "../../../../utils/task-list/select/styleSelectedElement";
import selectTask from "../../../../utils/task-list/select/selectTask";

type TTaskListItem = {
  task: Task;
  animationData?: string;
};
export default function TaskListItem(props: TTaskListItem) {
  const { currentTask, setCurrentTask, setEditedTask } = useTasksContext();
  return (
    <Container
      className="d-flex flex-row gap-2 p-2 ms-0 currentList-tasks-container fadeIn rounded"
      key={props.task.title}
    >
      <input type="checkbox" onClick={() => {}} className="checkbox mt-4" />
      <Button
        className="d-flex flex-column align-items-start bg-transparent text-dark-emphasis border-0 fw-semibold p-3 gap-2 bgHover scaleHover"
        style={{ flex: 1 }}
        data-style={`current-list-item-${props.task.taskID}`}
        onClick={(e) => {
          if (currentTask.taskID !== props.task.taskID) {
            selectTask(500, 100, setCurrentTask, props.task, setEditedTask);
            styleSelectedElement(
              '[data-style*="current-list-item"]',
              "data-style",
              e,
              "bgHoverFocus"
            );
          }
        }}
      >
        <div
          className="d-flex flex-row"
          style={{ width: "100%", pointerEvents: "none" }}
        >
          <span className="currentList-task-truncate text-start txt-medium">
            {props.task.title}
          </span>
          <ArrowIcon
            className="text-secondary regular-icon ms-auto"
            style={{
              transform: `rotate(90deg)`,
            }}
          />
        </div>
        <div
          className="d-flex flex-row align-items-center text-dark-emphasis fw-semibold gap-4 txt-small p-0 m-0"
          style={{ pointerEvents: "none" }}
        >
          <div className="d-flex flex-row align-items-center gap-2">
            <DateIcon />
            <span>{props.task.date}</span>
          </div>
          <div className="d-flex flex-row align-items-center text-center gap-2">
            <div className="d-flex justify-content-center align-items-center  currentList-task-subtasksIcon currentList-task-icon-radius">
              {props.task.subtasks.length ? props.task.subtasks.length : 1}
            </div>
            <span>Subtasks</span>
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              className="small-icon currentList-task-icon-radius"
              style={{ backgroundColor: `${props.task.listColor}` }}
            ></div>
            <span>{props.task.list}</span>
          </div>
        </div>
      </Button>
    </Container>
  );
}
