import {
  Button,
  Container,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useState, useContext } from "react";
import { PiArrowElbowDownRightThin as SubtaskIcon } from "react-icons/pi";
import { MdDeleteForever as DeleteSubtaskIcon } from "react-icons/md";
import InputLabeled from "../ui/inputs/InputLabeled";
import { TasksContext } from "../../context/tasksContext";
import IconButton from "../ui/buttons/IconButton";
import { MdAdd as AddIcon } from "react-icons/md";
import { ModalContext } from "../../context/modalContext";
import ListSelect from "../ui/inputs/ListSelect";
import addNewTask from "../../utils/api/post-data/addNewTask";
import { AuthContext } from "../../context/authContext";
import addNewSubtask from "../../utils/api/post-data/addSubtask";
export default function AddTaskModalContent() {
  const { categoryList } = useContext(TasksContext);
  const { userID } = useContext(AuthContext);
  const { showModal, setShowModal } = useContext(ModalContext);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [list, setList] = useState<string>(categoryList[0].category);
  const [date, setDate] = useState<string>("");
  const [subtasks, setSubtasks] = useState<
    {
      title: string;
      description?: string;
      subtaskStatus: boolean;
    }[]
  >([]);
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
        <div className="d-flex flex-column p-0 gap-2 " style={{ width: "30%" }}>
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
          <Container className="d-flex flex-row gap-4 text-secondary fw-semibold txt-small align-items-center p-0 ">
            <span>Due date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              className="break-words dashboard-tasks-details-date-input border focus-ring border-dark-subtle rounded bg-transparent fw-semibold text-secondary text-center p-1 ms-auto"
            />
          </Container>
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
                subtaskStatus: false,
              },
            ]);
          }}
        />
        {subtasks.map((subtask, index) => {
          return (
            <div
              className="d-flex flex-column gap-2"
              key={`${index + 1}subtask for ${title}`}
            >
              <div className="d-flex flex-row align-items-center ">
                <input
                  className={`${
                    subtasks[index].title !== ""
                      ? "border-0"
                      : "border border-secondary-subtle focus-ring"
                  } bg-transparent rounded text-secondary fw-semibold txt-small d-flex`}
                  value={subtask.title}
                  onChange={(e) => {
                    subtasks[index].title = e.target.value;
                    setSubtasks([...subtasks]);
                  }}
                />
                {/* Code below: add subtask description if subtask doesnt have it */}
                {subtask.description === undefined ? (
                  <IconButton
                    icon={<AddIcon className="regular-icon" />}
                    size="sm"
                    buttonClass="d-flex flex-row align-items-center accordion-item-txt text-secondary fw-semibold border-0 rounded bg-transparent"
                    function={() => {
                      subtasks[index].description = "";
                      setSubtasks([...subtasks]);
                    }}
                  />
                ) : null}
                <Button
                  type="button"
                  className="ms-auto border-0 p-2 rounded btn btn-primary "
                  onClick={() => {
                    setSubtasks(
                      subtasks.filter(
                        (deleteSub) => deleteSub.title !== subtask.title
                      )
                    );
                  }}
                >
                  Delete subtask
                </Button>
              </div>
              {subtask.description !== undefined ? (
                <div className="d-flex flex-row mt-1">
                  <SubtaskIcon className="small-icon ms-1 flex-shrink-0" />
                  <input
                    className={`${
                      subtasks[index].description !== ""
                        ? "border-0"
                        : "border border-secondary-subtle focus-ring"
                    } bg-transparent rounded text-secondary fw-semibold txt-small`}
                    value={subtask.description}
                    onChange={(e) => {
                      subtasks[index].description = e.target.value;
                      setSubtasks([...subtasks]);
                    }}
                  />
                  <IconButton
                    icon={<DeleteSubtaskIcon className="regular-icon" />}
                    size="sm"
                    buttonClass="d-flex flex-row align-items-center accordion-item-txt text-secondary fw-semibold border-0 rounded bg-transparent"
                    function={() => {
                      delete subtasks[index].description;
                      setSubtasks([...subtasks]);
                    }}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          className="txt-small"
          onClick={async () => {
            if (title !== "" && description !== "" && date !== "") {
              await addNewTask(userID, list, title, description, date);
              if (subtasks.length > 0) {
                subtasks.forEach(async (subtask) => {
                  await addNewSubtask(
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
