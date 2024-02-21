import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useState, useContext, ReactNode } from "react";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import {
  SubtaskType,
  Task,
  TasksContext,
} from "../../../../context/tasksContext";
import { useModalContext } from "../../../../context/modalContext";
import ListSelect from "../../../ui/inputs/ListSelect";
import { useAuthContext } from "../../../../context/authContext";
import addNewTaskDB from "../../../../utils/api/post-data/post/setTaskDB";
import InputDate from "../../../ui/inputs/InputDate";
import addTask from "../../../../utils/task-list/add/addTask";
import AddButton from "../../../ui/buttons/AddButton";
import { Reorder } from "framer-motion";
import SubtaskModal from "./SubtaskModal";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";

export default function AddTaskModalContent() {
  const { taskLists, setTaskLists, setCurrentList, currentList } =
    useContext(TasksContext);
  const { authContext } = useAuthContext();
  const { modalContext, setModalContext } = useModalContext();
  const [newTask, setNewTask] = useState<Task>({
    start: "",
    end: "",
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
      newTask.start !== "" &&
      newTask.end !== "" &&
      newTask.start !== newTask.end &&
      new Date(newTask.start).getTime() < new Date(newTask.end).getTime() &&
      newTask.list !== ""
      ? true
      : false;
  };

  return (
    <>
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Add task
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 border-0 my-bg-darker modal-body overflow-auto">
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Title"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          inputType="text"
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          inputPlaceholder="Title..."
          inputValue={newTask.title}
          onChange={(e) => {
            setNewTask({ ...newTask, title: e.target.value });
          }}
        />
        <TxtAreaLabeled
          containerClass="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Description"
          placeholder="Description..."
          labelClass="my-color-light fw-semibold mb-1 txt-small"
          txtAreaClass="task-details-descripion border-0 shadowHover shadowFocus w-100 txt-small modal-description my-bg-dark rounded fw-semibold my-color-light p-2"
          txtAreaValue={newTask.description}
          onChange={(e) => {
            setNewTask({ ...newTask, description: e.target.value });
          }}
        />

        <div className="d-flex flex-column p-0 gap-2 me-auto">
          <ListSelect
            containerStyle="d-flex flex-row p-0 gap-2 fw-semibold ms-auto align-items-center bg-transparent w-100 justify-content-between"
            label="List"
            labelStyle="my-color-light"
            selectStyle="border-0 rounded fw-semibold txt-small text-start p-1 select-purple my-color-lighter"
            optionStyle="fw-semibold txt-small"
            options={taskLists.map((list) => list.listName)}
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
            containerSyle="d-flex flex-row justify-content-between gap-4 my-color-light fw-semibold txt-small align-items-center p-0"
            labelValue="Start"
            inputStyle="border-0 rounded my-color-light p-1 ms-auto fw-semibold txt-small shadowFocus shadowHover my-bg-dark text-center"
            inputType="datetime-local"
            inputValue={newTask.start}
            onChange={(e) => {
              setNewTask({ ...newTask, start: e.target.value });
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row justify-content-between gap-4 my-color-light fw-semibold txt-small align-items-center p-0"
            labelValue="Start"
            inputStyle="border-0 rounded my-color-light p-1 ms-auto fw-semibold txt-small shadowFocus shadowHover my-bg-dark text-center"
            inputType="datetime-local"
            inputValue={newTask.end}
            onChange={(e) => {
              setNewTask({ ...newTask, end: e.target.value });
            }}
          />
        </div>
        <AddButton
          buttonTxt="Add subtask"
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
        <div className="d-flex flex-column">
          <Reorder.Group
            axis="y"
            values={newTask.subtasks}
            className="d-flex flex-column p-0 gap-4"
            onReorder={(newOrder) => {
              const subtasks: SubtaskType[] = newOrder;
              setNewTask({ ...newTask, subtasks: [...subtasks] });
            }}
          >
            {newTask.subtasks.map((subtask, index): ReactNode => {
              return (
                <Reorder.Item value={subtask} key={subtask.subtaskID}>
                  <SubtaskModal
                    subtask={subtask}
                    newTask={newTask}
                    setNewTask={setNewTask}
                    index={index}
                  />
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      </ModalBody>
      <ModalFooter className="my-bg-darker border-0">
        <Button
          size="sm"
          className={`${
            !newTaskIsVlid()
              ? "btn-purple my-color-light"
              : "bg-warning text-secondary"
          } border-0 fw-semibold my-color-lighter txt-small`}
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
                showModal: !modalContext.showModal,
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
