import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useState, useContext } from "react";
import InputLabeled from "../ui/inputs/InputLabeled";
import { TasksContext } from "../../context/tasksContext";
import IconButton from "../ui/buttons/IconButton";
import { MdAdd as AddIcon } from "react-icons/md";
import { ModalContext } from "../../context/modalContext";
import ListSelect from "../ui/inputs/ListSelect";
import { AuthContext } from "../../context/authContext";
import addNewTaskDB from "../../utils/api/post-data/post/addNewTaskDB";
import InputDate from "../ui/inputs/InputDate";
import Subtask from "../dashboard/tasks-list-area/task-details/Subtask";
import { TaskType } from "../../types/TaskType";
import addTask from "../../utils/task-list/add/addTask";

export default function AddTaskModalContent() {
  const { taskLists, setTaskLists, setTaskList, taskList } =
    useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [newTask, setNewTask] = useState<TaskType>({
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
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">Add subtask</ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 modal-body-small-container overflow-auto scrollbar">
        <InputLabeled
          labelValue="Title"
          labelStyle="text-secondary fw-semibold txt-small"
          inputType="text"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={newTask.title}
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
          }}
        />
        <InputLabeled
          labelValue="Description"
          labelStyle="text-secondary fw-semibold txt-small"
          inputType="text"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
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
            selectStyle="border border-dark-subtle rounded bg-transparent fw-semibold txt-small text-secondary text-center p-1 focus-ring"
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
            inputStyle="break-words dashboard-tasks-details-date-input border border-dark-subtle focus-ring rounded bg-transparent fw-semibold text-secondary text-center p-1 ms-auto"
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
          buttonClass="d-flex flex-row align-items-center accordion-item-txt text-secondary fw-semibold border-0 rounded bg-transparent btn me-auto"
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
        {newTask.subtasks.map((subtask, index) => {
          return (
            <Subtask
              key={`subtask ${index + 1}`}
              index={index}
              subtask={subtask}
              taskChanges={newTask}
              setTaskChanges={setNewTask}
            />
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          className="txt-small"
          onClick={async () => {
            if (newTaskIsVlid()) {
              await addNewTaskDB(userID, newTask);
              addTask(taskLists, setTaskLists, taskList, setTaskList, newTask);
              setShowModal(!showModal);
            } else {
              setShowModal(!showModal);
            }
          }}
        >
          {newTaskIsVlid() ? "Add task" : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
