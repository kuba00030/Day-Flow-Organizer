import { MdAdd as AddIcon } from "react-icons/md";
import IconButton from "../../../ui/buttons/IconButton";
import Header from "../../../Header";
import { useModalContext } from "../../../../context/modalContext";
import AddTaskModalContent from "../../../modal/AddTaskModalContent";
import { useTasksContext } from "../../../../context/tasksContext";
import AddNewListModalContent from "../../../modal/AddNewListModalContent";
import renderTaskList from "../../../../utils/task-list/render/renderTaskList";
import "../../../../styles/dashboard/dashboard-nav.css";
export default function TasksList() {
  const { modalContext, setModalContext } = useModalContext();
  const { taskLists, currentList } = useTasksContext();
  return (
    <div className="d-flex flex-column p-2" style={{ flex: 1 }}>
      <Header
        txt={`${currentList.listName}`}
        className="txt-larger fw-semibold ms-2 mb-2 text-dark-emphasis"
      />
      <div className="d-flex flex-column" style={{ flex: 1, gap: "10px" }}>
        <IconButton
          icon={<AddIcon className="regular-icon" />}
          txt="Add task"
          size="sm"
          buttonClass="d-flex flex-row align-items-center bg-transparent fw-semibold text-secondary border border-secondary-subtle btn-outline-secondary rounded mb-2 gap-2 shadowHover"
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
        {renderTaskList(currentList)}
      </div>
    </div>
  );
}
