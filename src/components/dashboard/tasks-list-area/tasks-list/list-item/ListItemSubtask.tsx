import { ListItem } from "./ListItemHeader";

export default function ListItemSubtask(props: ListItem) {
  return (
    <div className=" align-items-center text-center gap-2 my-color-light task-list-item-details-subtasks">
      <div className="d-flex justify-content-center align-items-center currentList-task-subtasksIcon currentList-task-icon-radius text-truncate">
        {props.task.subtasks.length ? props.task.subtasks.length : 1}
      </div>
      <span className="text-truncate">Subtasks</span>
    </div>
  );
}
