import { Button, Container } from "react-bootstrap";
import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskDetailsInfo from "./TaskDetailsInfo";
import TaskDetailsSubtasks from "./TaskDetailsSubtasks";
import { SubtaskType, TaskType } from "../../../../types/TaskType";
import { useContext, useEffect, useState } from "react";
import { TasksContext } from "../../../../context/tasksContext";
export default function TaskDetails() {
  const { taskDetails, changedTask, setChangedTask } = useContext(TasksContext);
  const [hasTaskChanged, setHasTaskChanged] = useState<boolean>(false);
  const editTask = (property: string, e: any) => {
    setChangedTask({
      ...changedTask,
      [property]: e.target.value,
    });
  };
  const compareTaskChanges = () => {
    for (const key in changedTask) {
      if (key !== "subtasks") {
        if(changedTask[key] !== taskDetails[key])
      }
      if (key === "subtasks") {
        subtaskHasChanged(changedTask[key], taskDetails[key]);
      }
      setHasTaskChanged(false);
    }
  };
  const taskHasChanged = (
    changedTask: TaskType,
    originTask: TaskType,
    key: string
  ) => {
    if (changedTask[key] !== originTask[key]) {
      setHasTaskChanged(true);
    }
  };
  const subtaskHasChanged = (
    changedSubtasks: SubtaskType[],
    originSubtaks: SubtaskType[]
  ) => {
    changedSubtasks.forEach((subtask: SubtaskType, index: number) => {
      for (const key in subtask) {
        if (subtask[key] !== originSubtaks[index][key]) {
          setHasTaskChanged(true);
        }
      }
    });
  };
  useEffect(() => {
    compareTaskChanges();
  }, [changedTask]);
  useEffect(() => {
    console.log(hasTaskChanged);
  }, [hasTaskChanged]);
  return (
    <div
      className="bg-body-secondary rounded dashboard-tasks-details "
      style={{
        flex: 1,
      }}
    >
      <Container className="p-0 d-flex flex-column dashboard-tasks-details-slider ">
        <TaskDetailsHeader
          header="Task"
          description={changedTask.title}
          editTask={editTask}
          taskProperty="title"
        />
        <TaskDetailsHeader
          header="Description"
          description={changedTask.description}
          editTask={editTask}
          taskProperty="description"
        />
        <TaskDetailsInfo
          date={taskDetails.date}
          editTask={editTask}
          taskProperty="date"
        />
        {/* <TaskDetailsSubtasks subtasks={taskDetails.subtasks} /> */}
      </Container>
      {/* <Button>Delete task</Button>
      <Button>save changes</Button> */}
    </div>
  );
}
// if values are diff change close button to 'save changes'
