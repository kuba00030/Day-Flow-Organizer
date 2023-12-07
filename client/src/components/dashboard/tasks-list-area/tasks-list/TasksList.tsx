import { Container } from "react-bootstrap";
import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import TaskListItem from "./TasksListItem";
import Header from "../../../Header";
import { TaskType } from "../../../../types/TaskType";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import AddTaskModalContent from "../../../modal/AddTaskModalContent";
import { TasksContext } from "../../../../context/tasksContext";
import AddNewListModalContent from "../../../modal/AddNewListModalContent";
type TTaskList = {
  tasksList: TaskType[];
};
export default function TasksList(props: TTaskList) {
  const { setModalContent, setShowModal, showModal } = useContext(ModalContext);
  const { categoryList, taskList } = useContext(TasksContext);
  const renderTasks = (): React.ReactNode => {
    if (taskList.listName !== "Upcoming" && taskList.listName !== "Today") {
      if (taskList.tasks.length > 0) {
        return props.tasksList.map((task: TaskType, index: number) => (
          <TaskListItem task={task} key={`task ${index}`} />
        ));
      } else {
        return (
          <div
            className="d-flex justify-content-center align-items-center text-center  text-secondary fw-semibold txt-small"
            style={{ flex: 1 }}
          >
            Add your first task
          </div>
        );
      }
    }
    if (taskList.listName === "Upcoming") {
      if (taskList.tasks.length > 0) {
        return props.tasksList.map((task: TaskType, index: number) => (
          <TaskListItem task={task} key={`task ${index}`} />
        ));
      } else {
        return (
          <div
            className="d-flex justify-content-center align-items-center text-center  text-secondary fw-semibold txt-small"
            style={{ flex: 1 }}
          >
            No tasks to do in upcoming days.
          </div>
        );
      }
    }
    if (taskList.listName === "Today") {
      if (taskList.tasks.length > 0) {
        return props.tasksList.map((task: TaskType, index: number) => (
          <TaskListItem task={task} key={`task ${index}`} />
        ));
      } else {
        <div
          className="d-flex justify-content-center align-items-center text-center  text-secondary fw-semibold txt-small"
          style={{ flex: 1 }}
        >
          No tasks for today.
        </div>;
      }
    }
  };
  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <Header
        txt={`${taskList.listName}`}
        className="txt-larger fw-semibold ms-2 mb-2 text-dark-emphasis"
      />
      <Container className="d-flex flex-column gap-2" style={{ flex: 1 }}>
        <IconButton
          icon={<AddIcon className="accordion-item-icon" />}
          txt="Add task"
          size="sm"
          buttonClass="d-flex flex-row align-items-center accordion-item-txt bg-transparent fw-semibold text-secondary border border-secondary-subtle btn-outline-secondary rounded"
          function={() => {
            if (categoryList.length > 0) {
              setModalContent(<AddTaskModalContent />);
              setShowModal(!showModal);
            } else {
              setModalContent(<AddNewListModalContent />);
              window.alert(
                "You have no task list created yet. Please create new task list first."
              );
              setShowModal(!showModal);
            }
          }}
        />
        {renderTasks()}
      </Container>
    </div>
  );
}
