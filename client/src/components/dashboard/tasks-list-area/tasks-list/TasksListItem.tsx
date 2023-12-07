import { Button, Container } from "react-bootstrap";
import { IoIosArrowUp as ArrowIcon } from "react-icons/io";
import { BsFillCalendar2XFill as DateIcon } from "react-icons/bs";
import { TaskType } from "../../../../types/TaskType";
import { TasksContext } from "../../../../context/tasksContext";
import { useContext } from "react";
import getCurrentDate from "../../../../utils/task-list/getCurrentDate";
type TTaskListItem = {
  task: TaskType;
};
export default function TaskListItem(props: TTaskListItem) {
  const { isTaskOpened, setIsTaskOpened, setTaskDetails } =
    useContext(TasksContext);

  return (
    <Container className="d-flex flex-column p-0">
      <Container className="d-flex flex-row align-items-center border-bottom ">
        <input type="checkbox" onClick={() => {}} className="checkbox" />
        <Button
          size="sm"
          className="d-flex flex-row justify-content-between align-items-center bg-transparent border-0"
          style={{ flex: 1 }}
          onClick={() => {
            setIsTaskOpened(!isTaskOpened);
            setTaskDetails(props.task);
          }}
        >
          <div>
            <span className="text-secondary fw-semibold txt-small">
              {props.task.title}
            </span>
            {props.task.date !== getCurrentDate() ? (
              <span>
                {props.task.subtasks.length > 0
                  ? props.task.subtasks.length
                  : 1}
              </span>
            ) : null}
          </div>
          <ArrowIcon
            className="text-secondary regular-icon"
            style={{
              transform: `rotate(90deg)`,
            }}
          />
        </Button>
      </Container>
      {props.task.date !== getCurrentDate() ? (
        <Container className="d-flex align-items-center flex-row  gap-4 mt-2">
          <div className="d-flex flex-row align-items-center text-secondary txt-small fw-semibold gap-2">
            <DateIcon className="small-icon " />
            <span>{props.task.date}</span>
          </div>
          <div className="d-flex flex-row align-items-center text-secondary txt-small fw-semibold gap-2">
            <span>Tasks</span>
            <span>
              {props.task.subtasks.length > 0
                ? props.task.subtasks.length + 1
                : 1}
            </span>
          </div>
          <div className="d-flex flex-row align-items-center text-secondary fw-semibold txt-small gap-2">
            <span>{props.task.list}</span>
            <div
              className="small-icon radius-small"
              style={{ backgroundColor: `${props.task.listColor}` }}
            ></div>
          </div>
        </Container>
      ) : null}
    </Container>
  );
}
