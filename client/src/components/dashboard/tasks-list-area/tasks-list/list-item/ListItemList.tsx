import { ListItem } from "./ListItemHeader";

export default function ListItemList(props: ListItem) {
  return (
    <div className="align-items-center gap-2 my-color-light task-list-item-details-list">
      <div
        className="small-icon currentList-task-icon-radius"
        style={{ backgroundColor: `${props.task.listColor}` }}
      ></div>
      <span>{props.task.list}</span>
    </div>
  );
}
