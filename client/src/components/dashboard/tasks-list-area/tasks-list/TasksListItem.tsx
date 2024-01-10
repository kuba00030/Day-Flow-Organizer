import { Button, Container } from "react-bootstrap";
import { IoIosArrowUp as ArrowIcon } from "react-icons/io";
import { BsFillCalendar2XFill as DateIcon } from "react-icons/bs";
import { Task, useTasksContext } from "../../../../context/tasksContext";
import selectTask from "../../../../utils/task-list/select/selectTask";
type TTaskListItem = {
  task: Task;
};
export default function TaskListItem(props: TTaskListItem) {
  const { currentTask, setCurrentTask, setEditedTask } = useTasksContext();
  return (
    <Container className="d-flex flex-column p-0 ms-0 currentList-tasks-container">
      <Container className="d-flex flex-row align-items-start gap-2 pb-2">
        <input type="checkbox" onClick={() => {}} className="checkbox mt-1" />
        <Button
          size="sm"
          className="d-flex flex-column align-items-start bg-transparent border-0 text-dark-emphasis fw-semibold p-0 gap-2"
          style={{ flex: 1 }}
          onClick={() => {
            if (currentTask.taskID !== props.task.taskID) {
              selectTask(
                500,
                100,
                ".slideInRight",
                setCurrentTask,
                props.task,
                setEditedTask
              );
              setCurrentTask(props.task);
            }
          }}
        >
          <div className="d-flex" style={{ width: "100%" }}>
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
          <div className="d-flex flex-row align-items-center text-dark-emphasis fw-semibold gap-4 txt-small p-0 m-0">
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
    </Container>
  );
}
