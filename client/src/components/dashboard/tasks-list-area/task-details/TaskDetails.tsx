import { Button, Container } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { Task, useTasksContext } from "../../../../context/tasksContext";
import TaskDetailsSubtasks from "./TaskDetailsSubtasks";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import ListSelect from "../../../ui/inputs/ListSelect";
import InputDate from "../../../ui/inputs/InputDate";
import { editTask } from "../../../../utils/task-details/editTask";
import updateTaskDB from "../../../../utils/api/post-data/update/updateTaskDB";
import { useAuthContext } from "../../../../context/authContext";
import updateTask from "../../../../utils/task-list/update/updateTask";
import deleteTaskDB from "../../../../utils/api/delete-data/deleteTaskDB";
import deleteTask from "../../../../utils/task-list/delete/deleteTask";
import { compareTaskChanges } from "../../../../utils/task-details/CompareTaskChanges";

export default function TaskDetails() {
  const {
    currentTask,
    setCurrentTask,
    setEditedTask,
    editedTask,
    taskLists,
    setTaskLists,
    currentList,
  } = useTasksContext();

  const { authContext } = useAuthContext();
  const [hasTaskChanged, setHasTaskChanged] = useState<boolean>(false);

  useEffect(() => {
    compareTaskChanges(currentTask, editedTask, setHasTaskChanged);
  }, [editedTask]);

  useEffect(() => {
    let animationDuration = 500;

    const taskElements = document.querySelectorAll(".slideInRight");

    taskElements.forEach((element: HTMLDivElement) => {
      element.classList.remove("slideInRight");
      element.style.animationDuration = `${animationDuration}ms`;

      setTimeout(() => {
        element.classList.add("slideInRight");
        element.classList.remove("opacity_0");
      }, 1);

      animationDuration += 100;
    });
  }, []);

  return (
    <div className="w-25 p-0 d-flex flex-column bg-body-secondary rounded overflow-hidden position-relative">
      <Container
        data-task-details="task-details-slider"
        className="p-4 d-flex flex-column overflow-hidden gap-4"
        style={{ flex: 1 }}
      >
        <InputLabeled
          labelStyle="text-dark-emphasis fw-semibold txt-large"
          labelValue="Task:"
          inputType="text"
          inputStyle="border border-dark-subtle shadowFocus shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small slideInRight opacity_0"
          inputValue={editedTask.title}
          onChange={(e) => {
            editTask(editedTask, setEditedTask, "title", e);
          }}
        />
        <InputLabeled
          labelStyle="text-dark-emphasis fw-semibold txt-large"
          labelValue="Description:"
          inputType="text"
          inputStyle="border border-dark-subtle shadowFocus shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small slideInRight opacity_0"
          inputValue={editedTask.description}
          onChange={(e) => {
            editTask(editedTask, setEditedTask, "description", e);
          }}
        />
        <div className="d-flex flex-column p-0 gap-2">
          <ListSelect
            containerStyle="p-0 d-flex flex-row w-100 justify-content-between "
            label="List"
            labelStyle="text-secondary fw-semibold dashboard-tasks-details-txt"
            selectStyle="border border-dark-subtle shadowFocus shadowHover rounded bg-transparent fw-semibold txt-small text-secondary text-center p-1 slideInRight opacity_0"
            options={taskLists}
            optionStyle="text-secondary fw-semibold txt-small"
            selectedList={editedTask.list}
            onChange={(e) => {
              editTask(editedTask, setEditedTask, "list", e);
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row justify-content-between gap-4 text-secondary fw-semibold txt-small align-items-center p-0 "
            labelValue="Due date"
            inputStyle="shadowFocus shadowHover dashboard-tasks-details-date-input border border-dark-subtle rounded bg-transparent fw-semibold text-secondary text-center p-1 slideInRight opacity_0"
            inputType="date"
            inputValue={editedTask.date}
            onChange={(e) => {
              editTask(editedTask, setEditedTask, "date", e);
            }}
          />
        </div>
        <TaskDetailsSubtasks />
      </Container>
      <Container className="d-flex flex-column px-4 pb-4">
        <Button
          size="sm"
          className={`${
            !hasTaskChanged ? "btn" : "bg-warning text-secondary"
          } border-0 fw-semibold`}
          onClick={async () => {
            if (!hasTaskChanged) {
              // deleteTaskDB(authContext.userID, currentTask);
              deleteTask(taskLists, setTaskLists, currentTask);
              setCurrentTask(currentList.tasks[0]);
            } else {
              await updateTaskDB(authContext.userID, editedTask, currentTask);
              updateTask(editedTask, currentTask, setTaskLists, taskLists);
              setCurrentTask(currentList.tasks[0]);
              setEditedTask(currentList.tasks[0]);
              setHasTaskChanged(false);
            }
          }}
        >
          {!hasTaskChanged ? "Delete task" : "Save changes"}
        </Button>
      </Container>
    </div>
  );
}
