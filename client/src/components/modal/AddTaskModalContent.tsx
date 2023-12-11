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
import addNewSubtaskDB from "../../utils/api/post-data/post/addNewSubtaskDB";
import addNewTaskDB from "../../utils/api/post-data/post/addNewTaskDB";
import InputDate from "../ui/inputs/InputDate";
import Subtask from "../dashboard/tasks-list-area/task-details/Subtask";
import { SubtaskType } from "../../types/TaskType";
export default function AddTaskModalContent() {
  const { categoryList } = useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [list, setList] = useState<string>(categoryList[0].category);
  const [date, setDate] = useState<string>("");
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);
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
          inputValue={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <InputLabeled
          labelValue="Description"
          labelStyle="text-secondary fw-semibold txt-small"
          inputType="text"
          inputStyle="border border-secondary-subtle focus-ring p-2 bg-transparent rounded text-secondary fw-semibold txt-small"
          inputValue={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <div className="d-flex flex-column p-0 gap-2 me-auto">
          <ListSelect
            containerStyle="p-0 d-flex flex-row w-100 justify-content-between "
            options={categoryList}
            optionsProperty="category"
            optionStyle="text-secondary fw-semibold txt-small"
            label="List"
            labelStyle="text-secondary fw-semibold dashboard-tasks-details-txt"
            selectStyle="border border-dark-subtle rounded bg-transparent fw-semibold txt-small text-secondary text-center p-1 focus-ring"
            selectValue={list}
            onChange={(e) => {
              setList(e.target.value);
            }}
          />
          <InputDate
            containerSyle="d-flex flex-row gap-4 text-secondary fw-semibold txt-small align-items-center p-0"
            labelValue="Due date"
            inputStyle="break-words dashboard-tasks-details-date-input border border-dark-subtle focus-ring rounded bg-transparent fw-semibold text-secondary text-center p-1 ms-auto"
            inputType="date"
            inputValue={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <IconButton
          icon={<AddIcon className="regular-icon" />}
          txt="Add subtask"
          size="sm"
          buttonClass="d-flex flex-row align-items-center accordion-item-txt text-secondary fw-semibold border-0 rounded bg-transparent btn me-auto"
          function={() => {
            setSubtasks([
              ...subtasks,
              {
                title: "",
                description: "",
                subtaskStatus: false,
              },
            ]);
          }}
        />
        {subtasks.map((subtask, index) => {
          return (
            <Subtask
              key={`subtask ${index + 1}`}
              index={index}
              subtask={subtask}
              subtasks={subtasks}
              title={subtask.title}
              setSubtasks={setSubtasks}
            />
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          className="txt-small"
          onClick={async () => {
            if (title !== "" && description !== "" && date !== "") {
              await addNewTaskDB(userID, list, title, description, date);
              if (subtasks.length > 0) {
                subtasks.forEach(async (subtask) => {
                  await addNewSubtaskDB(
                    userID,
                    list,
                    title,
                    subtask.title,
                    subtask.description
                  );
                });
              }
              setShowModal(!showModal);
            } else {
              setShowModal(!showModal);
            }
          }}
        >
          {title !== "" && description !== "" && list !== "" && date !== ""
            ? "Add task"
            : "Close"}
        </Button>
      </ModalFooter>
    </>
  );
}
