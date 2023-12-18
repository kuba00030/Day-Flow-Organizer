import { Button, Container } from "react-bootstrap";
import { useContext, useEffect, useState, useRef } from "react";
import { TasksContext } from "../../../../context/tasksContext";
import TaskDetailsSubtasks from "./TaskDetailsSubtasks";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import {
  compareSubtaskChanges,
  compareTaskChanges,
} from "../../../../utils/task-details/compareTaskChanges";

import ListSelect from "../../../ui/inputs/ListSelect";
import InputDate from "../../../ui/inputs/InputDate";
import { editTask } from "../../../../utils/task-details/editTask";
import updateTaskDB from "../../../../utils/api/post-data/update/updateTaskDB";
import { AuthContext } from "../../../../context/authContext";
export default function TaskDetails() {
  const {
    taskDetails,
    setTaskDetails,
    isTaskOpened,
    mainTaskChanges,
    setMainTaskChanges,
    setSubtasksChanges,
    subTasksChanges,
    taskLists,
    taskList,
  } = useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  const [hasTaskChanged, setHasTaskChanged] = useState<boolean>(false);
  const [sliderHeight, setSliderHeight] = useState<number>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const taskDetailsRef = useRef<HTMLDivElement | null>(null);
  const reloadDataTime = 510;
  useEffect(() => {
    setMainTaskChanges(taskList.tasks[0]);
  }, [taskList]);
  useEffect(() => {
    compareTaskChanges(mainTaskChanges, taskDetails, setHasTaskChanged);
  }, [mainTaskChanges]);
  useEffect(() => {
    compareSubtaskChanges(
      subTasksChanges,
      taskDetails.subtasks,
      setHasTaskChanged
    );
  }, [subTasksChanges]);
  useEffect(() => {
    setSliderHeight(taskDetailsRef.current.offsetHeight);
  }, []);
  useEffect(() => {
    sliderRef.current.style.marginTop = `${sliderHeight}px`;
    setTimeout(() => {
      setMainTaskChanges({
        date: taskDetails.date,
        description: taskDetails.description,
        title: taskDetails.title,
        list: taskDetails.list,
        listColor: taskDetails.listColor,
        taskStatus: taskDetails.taskStatus,
      });
      setSubtasksChanges(taskDetails.subtasks);
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
          inputValue={mainTaskChanges.title}
          onChange={(e) => {
            editTask(mainTaskChanges, setMainTaskChanges, "title", e);
          }}
        />
        <InputLabeled
          labelStyle="text-secondary fw-semibold txt-large"
          labelValue="Description:"
          inputType="text"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={mainTaskChanges.description}
          onChange={(e) => {
            editTask(mainTaskChanges, setMainTaskChanges, "description", e);
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
            selectedList={mainTaskChanges.list}
            onChange={(e) => {
              editTask(mainTaskChanges, setMainTaskChanges, "list", e);
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row gap-4 text-secondary fw-semibold txt-small align-items-center p-0"
            labelValue="Due date"
            inputStyle="break-words dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary text-center p-1 ms-auto"
            inputType="date"
            inputValue={mainTaskChanges.date}
            onChange={(e) => {
              editTask(mainTaskChanges, setMainTaskChanges, "date", e);
            }}
          />
        </div>
        <TaskDetailsSubtasks
          subtasks={subTasksChanges}
          setSubtasks={setSubtasksChanges}
        />
      </Container>
      <div className="position-absolute bg-body-secondary bottom-0 w-100 p-4 ">
        <Button
          size="sm"
          className={`w-100 ${
            hasTaskChanged === false
              ? "bg-primary"
              : "bg-warning text-secondary"
          } border-0 fw-semibold`}
          onClick={() => {
            if (hasTaskChanged === false) {
              console.log("task deleted");
            } else {
              // updateTaskDB(
              //   userID,
              //   taskList.listName,
              //   { ...mainTaskChanges, subtasks: subTasksChanges },
              //   mainTaskChanges.title
              // );
              console.log("changes saved");
            }
          }}
        >
          {hasTaskChanged === false ? "Delete task" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
