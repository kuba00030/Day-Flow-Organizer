import { Button, Container } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { useTasksContext } from "../../../../context/tasksContext";
import TaskDetailsSubtasks from "./TaskDetailsSubtasks";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { compareTaskChanges } from "../../../../utils/task-details/compareTaskChanges";
import ListSelect from "../../../ui/inputs/ListSelect";
import InputDate from "../../../ui/inputs/InputDate";
import { editTask } from "../../../../utils/task-details/editTask";
import updateTaskDB from "../../../../utils/api/post-data/update/updateTaskDB";
import { useAuthContext } from "../../../../context/authContext";
import updateTask from "../../../../utils/task-list/update/updateTask";
import deleteTaskDB from "../../../../utils/api/delete-data/deleteTaskDB";
import deleteTask from "../../../../utils/task-list/delete/deleteTask";
export default function TaskDetails() {
  const {
    currentTask,
    setCurrentTask,
    prevTask,
    isTaskOpened,
    taskLists,
    setTaskLists,
    currentList,
  } = useTasksContext();
  const { authContext } = useAuthContext();
  const [hasTaskChanged, setHasTaskChanged] = useState<boolean>(false);
  const [sliderHeight, setSliderHeight] = useState<number>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const taskDetailsRef = useRef<HTMLDivElement | null>(null);
  const reloadDataTime = 510;
  useEffect(() => {
    compareTaskChanges(currentTask, prevTask.current, setHasTaskChanged);
  }, [currentTask]);
  useEffect(() => {
    setSliderHeight(taskDetailsRef.current.offsetHeight);
  }, []);
  useEffect(() => {
    sliderRef.current.style.marginTop = `${sliderHeight}px`;
    setTimeout(() => {
      setCurrentTask(currentTask);
    }, reloadDataTime + 5);
    setTimeout(() => {
      sliderRef.current.style.marginTop = `${0}px`;
    }, reloadDataTime + 10);
  }, [isTaskOpened]);
  return (
    <div
      className="w-25 p-0 d-flex flex-column bg-body-secondary rounded dashboard-tasks-details position-relative overflow-hidden"
      ref={taskDetailsRef}
    >
      <Container
        className="p-4 d-flex flex-column dashboard-tasks-details-slider overflow-hidden gap-4"
        style={{
          transition: `margin-top ${reloadDataTime}ms ease-in-out`,
        }}
        ref={sliderRef}
      >
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-large"
          labelValue="Task:"
          inputType="text"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={currentTask.title}
          onChange={(e) => {
            editTask(currentTask, setCurrentTask, "title", e);
          }}
        />
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-large"
          labelValue="Description:"
          inputType="text"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={currentTask.description}
          onChange={(e) => {
            editTask(currentTask, setCurrentTask, "description", e);
          }}
        />
        <div className="d-flex flex-column p-0 gap-2">
          <ListSelect
            containerStyle="p-0 d-flex flex-row w-100 justify-content-between"
            label="List"
            labelStyle="text-secondary fw-semibold dashboard-tasks-details-txt"
            selectStyle="border border-dark-subtle rounded bg-transparent fw-semibold txt-small text-secondary text-center p-1 focus-ring"
            options={taskLists}
            optionStyle="text-secondary fw-semibold txt-small"
            selectedList={currentTask.list}
            onChange={(e) => {
              editTask(currentTask, setCurrentTask, "list", e);
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row gap-4 text-secondary fw-semibold txt-small align-items-center p-0"
            labelValue="Due date"
            inputStyle="break-words dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary text-center p-1 ms-auto"
            inputType="date"
            inputValue={currentTask.date}
            onChange={(e) => {
              editTask(currentTask, setCurrentTask, "date", e);
            }}
          />
        </div>
        <TaskDetailsSubtasks
          taskChanges={currentTask}
          setTaskChanges={setCurrentTask}
        />
      </Container>
      <div className="position-absolute bg-body-secondary bottom-0 w-100 p-4 ">
        <Button
          size="sm"
          className={`w-100 ${
            !hasTaskChanged ? "bg-primary" : "bg-warning text-secondary"
          } border-0 fw-semibold`}
          onClick={async () => {
            if (!hasTaskChanged) {
              deleteTaskDB(authContext.userID, currentTask);
              deleteTask(taskLists, setTaskLists, currentTask);
              setCurrentTask(currentList.tasks[0]);
            } else {
              await updateTaskDB(
                authContext.userID,
                prevTask.current,
                currentTask
              );
              updateTask(
                prevTask.current,
                currentTask,
                setTaskLists,
                taskLists
              );
              setCurrentTask(currentList.tasks[0]);
              prevTask.current = currentList.tasks[0];
            }
          }}
        >
          {!hasTaskChanged ? "Delete task" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
