import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useState, useContext } from "react";
import InputLabeled from "../ui/inputs/InputLabeled";
import { Task, TasksContext } from "../../context/tasksContext";
import IconButton from "../ui/buttons/IconButton";
import { MdAdd as AddIcon } from "react-icons/md";
import { ModalContext, useModalContext } from "../../context/modalContext";
import ListSelect from "../ui/inputs/ListSelect";
import { AuthContext, useAuthContext } from "../../context/authContext";
import addNewTaskDB from "../../utils/api/post-data/post/addNewTaskDB";
import InputDate from "../ui/inputs/InputDate";
import Subtask from "../dashboard/tasks-list-area/task-details/Subtask";
import addTask from "../../utils/task-list/add/addTask";

export default function AddTaskModalContent() {
  const { taskLists, setTaskLists, setCurrentList, currentList } =
    useContext(TasksContext);
  const { authContext } = useAuthContext();
  const { modalContext, setModalContext } = useModalContext();
  const [newTask, setNewTask] = useState<Task>({
    date: "",
    description: "",
    taskStatus: false,
    title: "",
    list: taskLists[0].listName,
    taskID: `${new Date().getTime()}`,
    listColor: taskLists[0].listColor,
    subtasks: [],
  });

  const newTaskIsVlid = () => {
    return newTask.title !== "" &&
      newTask.description !== "" &&
      newTask.date !== "" &&
      newTask.list !== ""
      ? true
      : false;
  };
  return (
    <>
      <ModalHeader>
        <ModalTitle id="contained-modal-title-vcenter">Add subtask</ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 modal-body-small-container overflow-auto scrollbar">
        <InputLabeled
          labelValue="Title"
          labelStyle="text-secondary fw-semibold txt-small"
          inputType="text"
          inputStyle="border border-secondary-subtle boxShadow shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={newTask.title}
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
          }}
        />
        <InputLabeled
          labelValue="Description"
          labelStyle="text-secondary fw-semibold txt-small"
          inputType="text"
          inputStyle="border border-secondary-subtle boxShadow shadowHover p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={newTask.description}
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
          }}
        />
        <div className="d-flex flex-column p-0 gap-2 me-auto">
          <ListSelect
            containerStyle="p-0 d-flex flex-row w-100 justify-content-between "
            options={taskLists}
            optionStyle="text-secondary fw-semibold txt-small"
            label="List"
            labelStyle="text-secondary fw-semibold dashboard-tasks-details-txt"
            selectStyle="border border-dark-subtle rounded bg-transparent fw-semibold txt-small text-secondary text-center p-1 boxShadow shadowHover"
            selectedList={newTask.list}
            onChange={(e) => {
              let listIndex = taskLists
                .map((list) => list.listName)
                .indexOf(e.target.value);
              setNewTask({
                ...newTask,
                list: taskLists[listIndex].listName,
                listColor: taskLists[listIndex].listColor,
              });
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row gap-4 text-secondary fw-semibold txt-small align-items-center p-0"
            labelValue="Due date"
            inputStyle="break-words dashboard-tasks-details-date-input border border-dark-subtle boxShadow shadowHover rounded bg-transparent fw-semibold text-secondary text-center p-1 ms-auto"
            inputType="date"
            inputValue={newTask.date}
            onChange={(e) => {
              setNewTask({ ...newTask, date: e.target.value });
            }}
          />
        </div>
        <IconButton
          icon={<AddIcon className="regular-icon" />}
          txt="Add subtask"
          size="sm"
          buttonClass="d-flex flex-row align-items-center txt-small text-secondary fw-semibold border-0 rounded bg-transparent btn me-auto"
          function={() => {
            const newSubtaskID = new Date().getTime();
            setNewTask({
              ...newTask,
              subtasks: [
                ...newTask.subtasks,
                {
                  subtaskID: `${newSubtaskID}`,
                  title: "",
                  description: "",
                  subtaskStatus: false,
                },
              ],
            });
          }}
        />
        {/* {newTask.subtasks.map((subtask, index) => {
          return (
            <Subtask
              key={`subtask ${index + 1}`}
              index={index}
              subtask={subtask}
              taskChanges={newTask}
              setTaskChanges={setNewTask}
            />
          );
        })} */}
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          className={`${
            !newTaskIsVlid() ? "btn" : "bg-warning text-secondary"
          } border-0 fw-semibold`}
          onClick={async () => {
            if (newTaskIsVlid()) {
              await addNewTaskDB(authContext.userID, newTask);
              addTask(
                taskLists,
                setTaskLists,
                currentList,
                setCurrentList,
                newTask
              );
              setModalContext({
                ...modalContext,
                showModal: modalContext.showModal,
              });
            } else {
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            }
          }}
        >
          {newTaskIsVlid() ? "Add task" : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
