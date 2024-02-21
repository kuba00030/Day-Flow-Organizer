import { IoIosArrowUp as ArrowIcon } from "react-icons/io";
import { Task } from "../../../../../context/tasksContext";

export type ListItem = {
  task: Task;
};

export default function ListItemHeader(props: ListItem) {
  return (
    <div
      className="d-flex flex-row w-100 my-color-light"
      style={{ pointerEvents: "none" }}
    >
      <span className="text-truncate text-start txt-medium">
        {props.task.title}
      </span>
      <ArrowIcon
        className="my-color-light regular-icon ms-auto"
        style={{
          transform: `rotate(90deg)`,
        }}
      />
    </div>
  );
}
