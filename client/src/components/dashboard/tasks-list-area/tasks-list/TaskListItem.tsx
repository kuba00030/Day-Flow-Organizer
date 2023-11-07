import { Button, Container } from "react-bootstrap";
import { IoIosArrowUp as ArrowIcon } from "react-icons/io";
import { BsFillCalendar2XFill as DateIcon } from "react-icons/bs";
export default function TaskListItem() {
  return (
    <Container className="d-flex flex-column p-0">
      <Container className="d-flex flex-row align-items-center border-bottom ">
        <input
          type="checkbox"
          onClick={() => {
            console.log("task is done");
          }}
          className="checkbox"
        />
        <Button
          size="sm"
          className="d-flex flex-row justify-content-between align-items-center bg-transparent border-0"
          style={{ flex: 1 }}
          onClick={() => {
            console.log("open certain task details");
          }}
        >
          <span className="text-secondary fw-semibold accordion-item-txt">
            task to be done
          </span>
          <ArrowIcon
            className="text-secondary accordion-item-icon"
            style={{
              transform: `rotate(90deg)`,
            }}
          />
        </Button>
      </Container>
      <Container className="d-flex align-items-center flex-row  gap-4 mt-2">
        <div className="d-flex flex-row align-items-center text-secondary accordion-item-txt fw-semibold gap-2">
          <DateIcon className="small-icon " />
          <span>23-03-2023</span>
        </div>
        <div className="d-flex flex-row align-items-center text-secondary accordion-item-txt fw-semibold gap-2">
          <span>Subtasks</span>
          <span>10</span>
        </div>
        <div className="d-flex flex-row align-items-center text-secondary fw-semibold accordion-item-txt gap-2">
          <div className="small-icon radius-small accordion-item-icon-dot"></div>
          <span>Personal</span>
        </div>
      </Container>
    </Container>
  );
}
// change margin from css to margin from bootstrap
