import { Button, Container } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { TaskList, useTasksContext } from "../../../../context/tasksContext";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import ListSelect from "../../../ui/inputs/ListSelect";
import InputDate from "../../../ui/inputs/InputDate";
import { editTask } from "../../../../utils/task-details/editTask";
import updateTaskDB from "../../../../utils/api/post-data/update/updateTaskDB";
import { useAuthContext } from "../../../../context/authContext";
import updateTask from "../../../../utils/task-list/update/updateTask";
import deleteTaskDB from "../../../../utils/api/delete-data/deleteTaskDB";
import deleteTask from "../../../../utils/task-list/delete/deleteTask";
import getElementsBySelector from "../../../../utils/task-list/get/getElementsBySelector";
import SubtasksDetails from "./SubtasksDetails";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";
import useSlideInOnClick from "../../../../hooks/useSlideInOnClick";
import { IoIosArrowBack as ArrowIcon } from "react-icons/io";
import { useCompareTasks } from "../../../../hooks/useCompareTasks";

type TaskDetails = {
  sortedList: TaskList;
};

export default function TaskDetails(props: TaskDetails) {
  const {
    currentTask,
    setCurrentTask,
    setEditedTask,
    editedTask,
    taskLists,
    setTaskLists,
    currentList,
    setCurrentList,
  } = useTasksContext();
  const { authContext } = useAuthContext();
  const [taskDetasilOpened, setTaskDetailsOpened] = useState<boolean>(false);
  const taskDetailsRef = useRef(null);
  const taskHasChanged = useCompareTasks(currentTask, editedTask);

  useEffect(() => {
    let animationDuration = 500;

    getElementsBySelector('[data-animation="slide-animation"]').forEach(
      (element: HTMLDivElement) => {
        element.classList.remove("slideInRight");
        element.style.animationDuration = `${animationDuration}ms`;

        setTimeout(() => {
          element.classList.add("slideInRight");
          element.classList.remove("opacity_0");
        }, 1);

        animationDuration += 100;
      }
    );
  }, [currentTask]);

  useSlideInOnClick(
    taskDetailsRef,
    taskDetasilOpened,
    setTaskDetailsOpened,
    "right",
    20,
    1025
  );
  return (
    <div
      ref={taskDetailsRef}
      className="p-0 d-flex flex-row my-bg-darker task-details-container overflow-hidden"
    >
      <ArrowIcon
        className="h-100 my-color-lighter section-opener section-opener-task-details"
        style={{ width: "20px" }}
        onClick={() => {
          setTaskDetailsOpened(!taskDetasilOpened);
        }}
      />
      <div
        className="d-flex flex-column flex-1 justify-content-between gap-2 overflow-hidden"
        data-task-details="task-details-slider"
      >
        <div className="p-4 d-flex flex-column flex-1 gap-4 my-scrollbar">
          <InputLabeled
            labelStyle="my-color-light txt-large"
            labelValue="Task:"
            inputType="text"
            inputWrapperStyle="slideInRight opacity_0"
            inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
            inputValue={editedTask.title}
            onChange={(e) => {
              editTask(editedTask, setEditedTask, "title", e);
            }}
            animationData="slide-animation"
          />
          <TxtAreaLabeled
            labelValue="Description"
            inputWrapperClass="opacity_0 slideInRight"
            labelClass="my-color-light fw-semibold mb-1 txt-large"
            txtAreaClass="task-details-descripion w-100 txt-small shadowHover shadowFocus my-bg-dark rounded border-0 my-color-light p-2 fw-semibold"
            txtAreaValue={editedTask.description}
            onChange={(e) => {
              editTask(editedTask, setEditedTask, "description", e);
            }}
            animationData="slide-animation"
          />
          <div className="d-flex flex-column p-1 gap-2">
            <ListSelect
              containerStyle="flex-row p-0 gap-2 w-100 justify-content-between align-items-center fw-semibold"
              label="List"
              labelStyle="my-color-light"
              selectStyle="border-0 rounded fw-semibold txt-small text-start p-2 select-purple my-color-lighter slideInRight opacity_0"
              optionStyle="fw-semibold txt-smaller"
              options={taskLists.map((list) => list.listName)}
              selectedList={editedTask.list}
              onChange={(e) => {
                editTask(editedTask, setEditedTask, "list", e);
              }}
              animationData="slide-animation"
            />
            <InputDate
              containerSyle="task-details-date-container my-color-light gap-2 justify-content-between fw-semibold p-0"
              labelValue="Start"
              labelStyle="my-auto mx-0 d-flex flex-1  txt-small"
              inputWrapperStyle="slideInRight opacity_0"
              inputStyle="border-0 rounded my-color-light p-1 task-details-date-input fw-semibold m-0 shadowFocus shadowHover my-bg-dark text-start txt-small"
              inputType="datetime-local"
              inputValue={editedTask.start}
              onChange={(e) => {
                editTask(editedTask, setEditedTask, "start", e);
              }}
              animationData="slide-animation"
            />
            <InputDate
              containerSyle="task-details-date-container my-color-light gap-2 justify-content-between fw-semibold p-0"
              labelValue="End"
              labelStyle="my-auto mx-0 d-flex flex-1  txt-small"
              inputWrapperStyle="slideInRight opacity_0"
              inputStyle="border-0 rounded my-color-light p-1 task-details-date-input fw-semibold m-0 shadowFocus shadowHover my-bg-dark text-start txt-small"
              inputType="datetime-local"
              inputValue={editedTask.end}
              onChange={(e) => {
                editTask(editedTask, setEditedTask, "end", e);
              }}
              animationData="slide-animation"
            />
          </div>
          <SubtasksDetails animationData="slide-animation" />
        </div>
        <Container className="d-flex flex-column px-4 pb-4">
          <Button
            className={`${
              !taskHasChanged
                ? "btn-purple my-color-lighter"
                : "bg-warning text-secondary"
            } border-0 fw-semibold txt-small`}
            onClick={async () => {
              if (!taskHasChanged) {
                await deleteTaskDB(authContext.userID, currentTask);
                deleteTask(
                  taskLists,
                  setTaskLists,
                  currentList,
                  setCurrentList,
                  currentTask
                );
                setCurrentTask(props.sortedList.tasks[0]);
              } else {
                await updateTaskDB(authContext.userID, currentTask, editedTask);
                updateTask(
                  currentTask,
                  editedTask,
                  setCurrentList,
                  setTaskLists,
                  taskLists
                );
                setCurrentTask(props.sortedList.tasks[0]);
                setEditedTask(props.sortedList.tasks[0]);
              }
            }}
          >
            {!taskHasChanged ? "Delete task" : "Save changes"}
          </Button>
        </Container>
      </div>
    </div>
  );
}
