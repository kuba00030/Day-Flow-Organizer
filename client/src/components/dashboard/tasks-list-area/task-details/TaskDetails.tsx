import { Button, Container } from "react-bootstrap";
import { useContext, useEffect, useState, useRef } from "react";
import { TasksContext } from "../../../../context/tasksContext";
import TaskDetailsSubtasks from "./TaskDetailsSubtasks";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import { compareTaskChanges } from "../../../../utils/task-details/compareTaskChanges";
import ListSelect from "../../../ui/inputs/ListSelect";
import InputDate from "../../../ui/inputs/InputDate";
import { editTask } from "../../../../utils/task-details/editTask";
import updateTaskDB from "../../../../utils/api/post-data/update/updateTaskDB";
import { AuthContext } from "../../../../context/authContext";
import updateTask from "../../../../utils/task-list/update/updateTask";
import deleteTaskDB from "../../../../utils/api/delete-data/deleteTaskDB";
import deleteTask from "../../../../utils/task-list/delete/deleteTask";
export default function TaskDetails() {
  const {
    taskDetails,
    setTaskDetails,
    isTaskOpened,
    taskChanges,
    setTaskChanges,
    taskLists,
    setTaskLists,
    taskList,
  } = useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  const [hasTaskChanged, setHasTaskChanged] = useState<boolean>(false);
  const [sliderHeight, setSliderHeight] = useState<number>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const taskDetailsRef = useRef<HTMLDivElement | null>(null);
  const reloadDataTime = 510;

  useEffect(() => {
    compareTaskChanges(taskChanges, taskDetails, setHasTaskChanged);
  }, [taskChanges]);
  useEffect(() => {
    setSliderHeight(taskDetailsRef.current.offsetHeight);
  }, []);
  useEffect(() => {
    sliderRef.current.style.marginTop = `${sliderHeight}px`;
    setTimeout(() => {
      setTaskChanges({
        taskID: taskDetails.taskID,
        date: taskDetails.date,
        description: taskDetails.description,
        title: taskDetails.title,
        list: taskDetails.list,
        listColor: taskDetails.listColor,
        taskStatus: taskDetails.taskStatus,
        subtasks: taskDetails.subtasks,
      });
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
          inputValue={taskChanges.title}
          onChange={(e) => {
            editTask(taskChanges, setTaskChanges, "title", e);
          }}
        />
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-large"
          labelValue="Description:"
          inputType="text"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={taskChanges.description}
          onChange={(e) => {
            editTask(taskChanges, setTaskChanges, "description", e);
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
            selectedList={taskChanges.list}
            onChange={(e) => {
              editTask(taskChanges, setTaskChanges, "list", e);
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row gap-4 text-secondary fw-semibold txt-small align-items-center p-0"
            labelValue="Due date"
            inputStyle="break-words dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary text-center p-1 ms-auto"
            inputType="date"
            inputValue={taskChanges.date}
            onChange={(e) => {
              editTask(taskChanges, setTaskChanges, "date", e);
            }}
          />
        </div>
        <TaskDetailsSubtasks
          taskChanges={taskChanges}
          setTaskChanges={setTaskChanges}
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
              deleteTaskDB(userID, taskChanges);
              deleteTask(taskLists, setTaskLists, taskChanges);
              setTaskDetails(taskList.tasks[0]);
              setTaskChanges(taskList.tasks[0]);
            } else {
              await updateTaskDB(userID, taskDetails, taskChanges);
              updateTask(taskDetails, taskChanges, setTaskLists, taskLists);
              setTaskDetails(taskList.tasks[0]);
              setTaskChanges(taskList.tasks[0]);
            }
          }}
        >
          {!hasTaskChanged ? "Delete task" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
