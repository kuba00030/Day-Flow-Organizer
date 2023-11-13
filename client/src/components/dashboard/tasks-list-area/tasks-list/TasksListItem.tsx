import { Button, Container } from "react-bootstrap";
import { IoIosArrowUp as ArrowIcon } from "react-icons/io";
import { BsFillCalendar2XFill as DateIcon } from "react-icons/bs";
import { TaskType } from "../../../../types/TaskType";
import { TasksContext } from "../../../../context/tasksContext";
import { useContext } from "react";
type TTaskListItem = {
  task: TaskType;
};
export default function TaskListItem(props: TTaskListItem) {
  const { isTaskOpened, setIsTaskOpened, setTaskDetails } =
    useContext(TasksContext);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
  const yyyy = today.getFullYear();
  const currentDate = `${yyyy}-${mm}-${dd}`;
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
            <span className="text-secondary fw-semibold accordion-item-txt">
              {props.task.title}
            </span>
            {props.task.date !== currentDate ? (
              <span>
                {props.task.subtasks.length > 0
                  ? props.task.subtasks.length
                  : 1}
              </span>
            ) : null}
          </div>
          <ArrowIcon
            className="text-secondary accordion-item-icon"
            style={{
              transform: `rotate(90deg)`,
            }}
          />
        </Button>
      </Container>
      {props.task.date !== currentDate ? (
        <Container className="d-flex align-items-center flex-row  gap-4 mt-2">
          <div className="d-flex flex-row align-items-center text-secondary accordion-item-txt fw-semibold gap-2">
            <DateIcon className="small-icon " />
            <span>{props.task.date}</span>
          </div>
          <div className="d-flex flex-row align-items-center text-secondary accordion-item-txt fw-semibold gap-2">
            <span>Subtasks</span>
            <span>{props.task.subtasks.length}</span>
          </div>
          <div className="d-flex flex-row align-items-center text-secondary fw-semibold accordion-item-txt gap-2">
            <div className="small-icon radius-small accordion-item-icon-dot"></div>
            <span>{props.task.list}</span>
          </div>
        </Container>
      ) : null}
    </Container>
  );
}
