import { Button, Container } from "react-bootstrap";
import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskDetailsInfo from "./TaskDetailsInfo";
import { useContext, useEffect, useState, useRef } from "react";
import { TasksContext } from "../../../../context/tasksContext";
import {
  compareSubtaskChanges,
  compareTaskChanges,
} from "../../../../utils/task-details/CompareTaskChanges";
import TaskDetailsSubtasks from "./TaskDetailsSubtasks";
export default function TaskDetails() {
  const {
    taskDetails,
    isTaskOpened,
    mainTaskChanges,
    setMainTaskChanges,
    setSubtasksChanges,
    subTasksChanges,
  } = useContext(TasksContext);
  const [hasTaskChanged, setHasTaskChanged] = useState<boolean>(false);
  const [sliderHeight, setSliderHeight] = useState<number>();
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const taskDetailsRef = useRef<HTMLDivElement | null>(null);
  const reloadDataTime = 510;
  const editTask = () => {
    //  add task into db
  };
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
        taskID: taskDetails.taskID,
        title: taskDetails.title,
        description: taskDetails.description,
        list: taskDetails.list,
        date: taskDetails.date,
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
      className="p-0 d-flex flex-column bg-body-secondary rounded dashboard-tasks-details position-relative "
      style={{
        flex: 1,
      }}
      ref={taskDetailsRef}
    >
      <Container
        className="p-4 d-flex flex-column dashboard-tasks-details-slider overflow-hidden"
        style={{
          transition: `margin-top ${reloadDataTime}ms ease-in-out`,
        }}
        ref={sliderRef}
      >
        <TaskDetailsHeader
          header="Task"
          description={mainTaskChanges.title}
          taskProperty="title"
          task={mainTaskChanges}
          setTask={setMainTaskChanges}
        />
        <TaskDetailsHeader
          header="Description"
          description={mainTaskChanges.description}
          taskProperty="description"
          task={mainTaskChanges}
          setTask={setMainTaskChanges}
        />
        <TaskDetailsInfo
          task={mainTaskChanges}
          setTask={setMainTaskChanges}
          date={mainTaskChanges.date}
          taskProperty="date"
        />
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
