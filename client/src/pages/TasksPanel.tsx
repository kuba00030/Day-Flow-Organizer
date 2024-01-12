import { MdAdd as AddIcon } from "react-icons/md";
import "../styles/dashboard/dashboard-nav.css";
import { useEffect, useState } from "react";
import { useModalContext } from "../context/modalContext";
import { TaskList, useTasksContext } from "../context/tasksContext";
import sortTaskList from "../utils/task-list/sort/sortTaskList";
import Header from "../components/Header";
import IconButton from "../components/ui/buttons/IconButton";
import AddTaskModalContent from "../components/modal/AddTaskModalContent";
import AddNewListModalContent from "../components/modal/AddNewListModalContent";
import ListSelect from "../components/ui/inputs/ListSelect";
import TaskDetails from "../components/dashboard/tasks-list-area/task-details/TaskDetails";
import TasksList from "../components/dashboard/tasks-list-area/tasks-list/TasksList";

export default function TasksPanel() {
  const { modalContext, setModalContext } = useModalContext();
  const { taskLists, currentList, editedTask, currentTask } = useTasksContext();
  const [sortedList, setSortedList] = useState<TaskList>(currentList);
  const [sortListOptions, setSortListOptions] = useState<
    "Default" | "Oldest" | "Latest"
  >("Default");

  useEffect(() => {
    setSortedList(sortTaskList(sortListOptions, sortedList, setSortedList));
  }, [sortListOptions]);

  useEffect(() => {
    setSortedList(currentList);
  }, [currentList]);

  return (
    <>
      <div className="d-flex flex-column p-2" style={{ flex: 1 }}>
        <Header
          txt={`${currentList.listName}`}
          keyProp={currentList.listName}
          className="txt-larger fw-semibold ms-2 mb-2 text-dark-emphasis fadeIn"
        />
        <div className="d-flex flex-column gap-3" style={{ flex: 1 }}>
          <div className="d-flex flex-row align-items-center gap-4">
            <IconButton
              icon={<AddIcon className="regular-icon" />}
              txt="Add task"
              size="sm"
              buttonClass="d-flex flex-row flex-grow-1 align-items-center bg-transparent fw-semibold text-secondary border border-secondary-subtle btn-outline-secondary rounded gap-2 shadowHover"
              buttonValClass="txt-small"
              function={() => {
                if (taskLists.length > 0) {
                  setModalContext({
                    showModal: !modalContext.showModal,
                    modalContent: <AddTaskModalContent />,
                  });
                } else {
                  window.alert(
                    "You have no task list created yet. Please create new task list first."
                  );
                  setModalContext({
                    showModal: !modalContext.showModal,
                    modalContent: <AddNewListModalContent />,
                  });
                }
              }}
            />
            <div
              className="d-flex flex-row ms-auto me-3"
              style={{ width: "15%" }}
            >
              <ListSelect
                containerStyle="p-0 d-flex flex-row w-100 gap-2"
                label="Sort by:"
                labelStyle="text-secondary fw-semibold dashboard-tasks-details-txt"
                selectStyle="d-flex flex-row flex-grow-1 border border-dark-subtle shadowFocus shadowHover rounded bg-transparent fw-semibold txt-small text-secondary text-start p-1"
                optionStyle="text-secondary fw-semibold txt-small"
                options={["Default", "Oldest", "Latest"]}
                selectedList={sortListOptions}
                onChange={(e) => {
                  setSortListOptions(e.target.value);
                }}
              />
            </div>
          </div>
          <TasksList list={sortedList} />
        </div>
      </div>
      {editedTask !== undefined && currentTask !== undefined ? (
        <TaskDetails />
      ) : null}
    </>
  );
}
