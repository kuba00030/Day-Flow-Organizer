import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import InputLabeled from "../../../ui/inputs/InputLabeled";
import TxtAreaLabeled from "../../../ui/inputs/TxtAreaLabeled";
import ListSelect from "../../../ui/inputs/ListSelect";
import InputDate from "../../../ui/inputs/InputDate";
import AddButton from "../../../ui/buttons/AddButton";
import { Reorder } from "framer-motion";
import SubtaskModal from "../add-task/SubtaskModal";
import { SubtaskType, useTasksContext } from "../../../../context/tasksContext";
import { editTask } from "../../../../utils/task-details/editTask";
import { ReactNode } from "react";
import { useModalContext } from "../../../../context/modalContext";
import deleteTaskDB from "../../../../utils/api/delete-data/deleteTaskDB";
import { useAuthContext } from "../../../../context/authContext";
import deleteTask from "../../../../utils/task-list/delete/deleteTask";
import updateTask from "../../../../utils/task-list/update/updateTask";
import updateTaskDB from "../../../../utils/api/post-data/update/updateTaskDB";
import { useCompareTasks } from "../../../../hooks/useCompareTasks";

export default function EditTaskModalContent() {
  const {
    currentTask,
    editedTask,
    setEditedTask,
    taskLists,
    setTaskLists,
    setCurrentList,
  } = useTasksContext();
  const { modalContext, setModalContext } = useModalContext();
  const { authContext } = useAuthContext();
  const taskHasChanged = useCompareTasks(currentTask, editedTask);
  return (
    <>
      <ModalHeader className="my-bg-darker my-color-light border-0">
        <ModalTitle
          id="contained-modal-title-vcenter"
          className="my-color-light border-0"
        >
          Edit task
        </ModalTitle>
      </ModalHeader>
      <ModalBody className="d-flex flex-column gap-4 border-0 my-bg-darker modal-body overflow-auto">
        <InputLabeled
          containerStyle="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelStyle="my-color-light fw-semibold mb-1 txt-small"
          labelValue="Task:"
          inputType="text"
          inputStyle="shadowHover shadowFocus w-100 border-0 p-2 my-bg-dark my-color-light fw-semibold rounded"
          inputValue={editedTask.title}
          onChange={(e) => {
            editTask(editedTask, setEditedTask, "title", e);
          }}
        />
        <TxtAreaLabeled
          containerClass="fw-semibold d-flex flex-column justify-content-center gap-2"
          labelValue="Description"
          labelClass="my-color-light fw-semibold mb-1 txt-small"
          txtAreaClass="task-details-descripion border-0 shadowHover shadowFocus w-100 txt-small modal-description my-bg-dark rounded fw-semibold my-color-light p-2"
          txtAreaValue={editedTask.description}
          onChange={(e) => {
            editTask(editedTask, setEditedTask, "description", e);
          }}
        />

        <div className="d-flex flex-column p-0 gap-2 me-auto">
          <ListSelect
            containerStyle="d-flex flex-row p-0 gap-2 fw-semibold ms-auto align-items-center bg-transparent w-100 justify-content-between"
            label="List"
            labelStyle="my-color-light"
            selectStyle="border-0 rounded fw-semibold txt-small text-start p-1 select-purple my-color-lighter "
            optionStyle="fw-semibold txt-small"
            options={taskLists.map((list) => list.listName)}
            selectedList={editedTask.list}
            onChange={(e) => {
              editTask(editedTask, setEditedTask, "list", e);
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row justify-content-between gap-4 my-color-light fw-semibold txt-small align-items-center p-0"
            labelValue="Start"
            inputStyle="border-0 rounded my-color-light p-1 ms-auto fw-semibold txt-small shadowFocus shadowHover my-bg-dark text-center"
            inputType="datetime-local"
            inputValue={editedTask.start}
            onChange={(e) => {
              console.log(e.target.value);
              editTask(editedTask, setEditedTask, "start", e);
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row justify-content-between gap-4 my-color-light fw-semibold txt-small align-items-center p-0"
            labelValue="End"
            inputStyle="border-0 rounded my-color-light p-1 ms-auto fw-semibold txt-small shadowFocus shadowHover my-bg-dark text-center"
            inputType="datetime-local"
            inputValue={editedTask.end}
            onChange={(e) => {
              editTask(editedTask, setEditedTask, "end", e);
            }}
          />
        </div>
        <AddButton
          buttonTxt="Add subtask"
          function={() => {
            const newSubtaskID = new Date().getTime();
            setEditedTask({
              ...editedTask,
              subtasks: [
                ...editedTask.subtasks,
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
            values={editedTask.subtasks}
            className="d-flex flex-column p-0 gap-4"
            onReorder={(newOrder) => {
              const subtasks: SubtaskType[] = newOrder;
              setEditedTask({ ...editedTask, subtasks: [...subtasks] });
            }}
          >
            {editedTask.subtasks.map((subtask, index): ReactNode => {
              return (
                <Reorder.Item value={subtask} key={subtask.subtaskID}>
                  <SubtaskModal
                    subtask={subtask}
                    newTask={editedTask}
                    setNewTask={setEditedTask}
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
          className={
            "fw-semibold btn-purple-outline my-color-lighter txt-small"
          }
          style={{ flex: 1 }}
          onClick={() => {
            setModalContext({
              ...modalContext,
              showModal: !modalContext.showModal,
            });
          }}
        >
          Close
        </Button>
        <Button
          className={`${
            !taskHasChanged
              ? "btn-purple my-color-lighter"
              : "bg-warning text-secondary"
          } border-0 fw-semibold txt-small`}
          style={{ flex: 1 }}
          onClick={async () => {
            if (taskHasChanged) {
              updateTask(
                currentTask,
                editedTask,
                setCurrentList,
                setTaskLists,
                taskLists
              );
              updateTaskDB(authContext.userID, currentTask, editedTask);
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            } else {
              await deleteTaskDB(authContext.userID, editedTask);
              deleteTask(taskLists, setTaskLists, setCurrentList, currentTask);
              setModalContext({
                ...modalContext,
                showModal: !modalContext.showModal,
              });
            }
          }}
        >
          {taskHasChanged ? "Save Changes" : "Delete"}
        </Button>
      </ModalFooter>
    </>
  );
}
