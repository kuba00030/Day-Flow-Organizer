import { BsFillCalendar2XFill as DateIcon } from "react-icons/bs";
import { ListItem } from "./ListItemHeader";
export default function ListItemDate(props: ListItem) {
  const dateFormat = (date: string) => {
    const formatedDate = new Date(date).toLocaleString();
    return formatedDate;
  };

  return (
    <div className="d-flex flex-row align-items-center gap-2 my-color-light">
      <DateIcon className="my-color-light" />
      <div className="d-flex flex-row gap-1">
        <span>{dateFormat(props.task.start)}</span>
        <span>{props.task.end !== props.task.start ? "-" : <></>}</span>
        {props.task.end !== props.task.start ? (
          <span>{dateFormat(props.task.end)}</span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
