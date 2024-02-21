import { Button } from "react-bootstrap";
import { Task, useTasksContext } from "../../../../../context/tasksContext";
import selectTask from "../../../../../utils/task-list/select/selectTask";
import ListItemHeader from "./ListItemHeader";
import ListItemDate from "./ListItemDate";
import ListItemSubtask from "./ListItemSubtask";
import ListItemList from "./ListItemList";
import markTaskDoneDB from "../../../../../utils/api/post-data/update/markTaskDoneDB";
import { useAuthContext } from "../../../../../context/authContext";
import markTaskDone from "../../../../../utils/task-list/update/markTaskDone";

type TTaskListItem = {
  task: Task;
  animationData?: string;
};

export default function ListItem(props: TTaskListItem) {
  const {
    currentTask,
    setCurrentTask,
    setEditedTask,
    taskLists,
    setTaskLists,
  } = useTasksContext();
  const { authContext } = useAuthContext();

  return (
    <div
      className="d-flex flex-row gap-2 p-2 ms-1 currentList-tasks-container fadeIn"
      key={props.task.title}
    >
      <input
        type="checkbox"
        onChange={async () => {
          await markTaskDoneDB(
            authContext.userID,
            props.task.list,
            props.task.taskID,
            props.task
          );
          markTaskDone(taskLists, props.task, setTaskLists);
        }}
        checked={props.task.taskStatus}
        className="checkbox mt-4"
      />

      <Button
        className={`d-flex flex-column flex-1 align-items-start border-0 fw-semibold p-3 gap-2 currentList-task scaleHover ${
          currentTask && props.task.taskID === currentTask.taskID
            ? "currentList-task-focus scaleHoverFocus"
            : ""
        }`}
        onClick={() => {
          if (currentTask.taskID !== props.task.taskID) {
            selectTask(500, 100, setCurrentTask, props.task, setEditedTask);
          }
        }}
      >
        <ListItemHeader task={props.task} />
        <div
          className="d-flex flex-row gap-4 align-items-center fw-semibold txt-small p-0 m-0"
          style={{ pointerEvents: "none" }}
        >
          <ListItemDate task={props.task} />

          <ListItemSubtask task={props.task} />

          <ListItemList task={props.task} />
        </div>
      </Button>
    </div>
  );
}
