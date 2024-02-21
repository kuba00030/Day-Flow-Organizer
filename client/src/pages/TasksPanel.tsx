import { useEffect, useState } from "react";
import { useModalContext } from "../context/modalContext";
import { TaskList, useTasksContext } from "../context/tasksContext";
import sortTaskList, {
  SortingCategories,
} from "../utils/task-list/sort/sortTaskList";
import Header from "../components/Header";
import AddTaskModalContent from "../components/modal/task/add-task/AddTaskModalContent";
import AddNewListModalContent from "../components/modal/add-list/AddNewListModalContent";
import ListSelect from "../components/ui/inputs/ListSelect";
import TaskDetails from "../components/dashboard/tasks-list-area/task-details/TaskDetails";
import TasksList from "../components/dashboard/tasks-list-area/tasks-list/TasksList";
import AddButton from "../components/ui/buttons/AddButton";
import selectTask from "../utils/task-list/select/selectTask";

export default function TasksPanel() {
  const { modalContext, setModalContext } = useModalContext();
  const {
    taskLists,
    currentList,
    editedTask,
    currentTask,
    setCurrentTask,
    setEditedTask,
  } = useTasksContext();
  const [sortedList, setSortedList] = useState<TaskList>(currentList);
  const [sortListOptions, setSortListOptions] =
    useState<SortingCategories>("Oldest");

  useEffect(() => {
    selectTask(500, 100, setCurrentTask, sortedList.tasks[0], setEditedTask);
  }, [sortedList]);

  useEffect(() => {
    setSortedList(sortTaskList(sortListOptions, currentList, setSortedList));
  }, [currentList, sortListOptions]);

  return (
    <>
      <div className="d-flex flex-column flex-1 p-2 position-relative">
        <Header
          txt={`${currentList.listName}`}
          keyProp={currentList.listName}
          className="txt-larger fw-semibold ms-2 mb-2 my-color-light fadeIn"
        />
        <div className="d-flex flex-column gap-3 flex-1 my-scrollbar">
          <div className="d-flex flex-row align-items-center gap-4 me-1">
            <AddButton
              buttonTxt="Add task"
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

            <ListSelect
              containerStyle="d-flex flex-row p-0 gap-2 fw-semibold ms-auto align-items-center bg-transparent"
              label="Sort by:"
              labelStyle="my-color-light txt-small"
              selectStyle="border-0 rounded fw-semibold txt-small text-center p-2 select-purple my-color-lighter"
              optionStyle="fw-semibold txt-smaller "
              options={["Oldest", "Latest", "Done", "Ongoing"]}
              selectedList={sortListOptions}
              onChange={(e) => {
                setSortListOptions(e.target.value);
              }}
            />
          </div>
          <TasksList list={sortedList} />
        </div>
      </div>
      {editedTask !== undefined && currentTask !== undefined ? (
        <TaskDetails sortedList={sortedList} />
      ) : null}
    </>
  );
}
