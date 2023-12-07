import { Container } from "react-bootstrap";
import NavAccordion from "./NavAccordion";
import NavAccordionItem from "./NavAccordionItem";
import IconButton from "../../ui/buttons/IconButton";
import NavSearchBar from "./NavSearchBar";
import {
  MdOutlineKeyboardDoubleArrowRight as UpcomingIcon,
  MdAdd as AddIcon,
} from "react-icons/md";
import {
  LuListTodo as TodayIcon,
  LuCalendarDays as CalendarIcon,
} from "react-icons/lu";
import { CiSettings as SettingsIcon } from "react-icons/ci";
// import { RiListSettingsLine as SettingsIcon } from "react-icons/ri";
import { PiSignOutBold as SignOutIcon } from "react-icons/pi";
import { useContext } from "react";
import { TasksContext } from "../../../context/tasksContext";
import { ModalContext } from "../../../context/modalContext";
import AddNewList from "../../modal/AddNewListModalContent";
import { TaskListType } from "../../../types/CategoryListType";
import SettingsModalContent from "../../modal/SettingModalContent";
import countListTasks from "../../../utils/task-list/countListTasks";
import getTasksInDaysRange from "../../../utils/task-list/getTasksInDaysRange";
export default function NavBar() {
  const {
    categoryList,
    setTaskList,
    setTaskDetails,
    setMainTaskChanges,
    setSubtasksChanges,
  } = useContext(TasksContext);
  const { showModal, setModalContent, setShowModal } = useContext(ModalContext);
  return (
    <Container className="d-flex flex-column w-25 rounded justify-content-between bg-body-secondary p-3">
      <Container className="d-flex flex-column p-0 gap-2">
        <NavSearchBar />
        <NavAccordion
          header="TASKS"
          items={[
            <NavAccordionItem
              itemStyle="accordion-item-txt text-secondary ms-auto"
              headerStyle="txt-small text-secondary"
              containerStyle="d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold"
              header="Upcoming"
              itemValue={`${getTasksInDaysRange(categoryList, 7).tasksAmount}`}
              onClick={() => {
                const { tasks } = getTasksInDaysRange(categoryList, 7);
                setTaskList({
                  category: "Upcoming",
                  tasks: tasks,
                  color: "",
                });
                if (tasks.length) {
                  setTaskDetails(tasks[0]);
                  setMainTaskChanges({
                    date: tasks[0].date,
                    description: tasks[0].description,
                    title: tasks[0].title,
                    list: tasks[0].list,
                    listColor: tasks[0].listColor,
                    taskStatus: tasks[0].taskStatus,
                  });
                  setSubtasksChanges([...tasks[0].subtasks]);
                } else {
                  setTaskDetails(undefined);
                  setMainTaskChanges(undefined);
                  setSubtasksChanges(undefined);
                }
              }}
              icon={
                <UpcomingIcon className="regular-icon me-2 text-secondary" />
              }
            />,
            <NavAccordionItem
              itemStyle="accordion-item-txt text-secondary ms-auto"
              headerStyle="txt-small text-secondary"
              containerStyle="d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold"
              header="Today"
              itemValue={`${getTasksInDaysRange(categoryList, 0).tasksAmount}`}
              onClick={() => {
                const { tasks } = getTasksInDaysRange(categoryList, 0);
                setTaskList({
                  category: "Today",
                  tasks: tasks,
                  color: "",
                });
                if (tasks.length) {
                  setTaskDetails(tasks[0]);
                  setMainTaskChanges({
                    date: tasks[0].date,
                    description: tasks[0].description,
                    title: tasks[0].title,
                    list: tasks[0].list,
                    listColor: tasks[0].listColor,
                    taskStatus: tasks[0].taskStatus,
                  });
                  setSubtasksChanges([...tasks[0].subtasks]);
                } else {
                  setTaskDetails(undefined);
                  setMainTaskChanges(undefined);
                  setSubtasksChanges(undefined);
                }
              }}
              icon={<TodayIcon className="regular-icon me-2 text-secondary" />}
            />,
            <NavAccordionItem
              itemStyle="accordion-item-txt text-secondary ms-auto"
              headerStyle="txt-small text-secondary"
              containerStyle="d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold"
              header="Calendar"
              itemValue={`${0}`}
              onClick={() => {}}
              icon={
                <CalendarIcon className="regular-icon me-2 text-secondary" />
              }
            />,
          ]}
        />
        <NavAccordion
          header="LISTS"
          items={categoryList.map((category: TaskListType) => {
            return (
              <NavAccordionItem
                itemStyle="accordion-item-txt text-secondary ms-auto"
                headerStyle="txt-small text-secondary"
                containerStyle="d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold"
                header={`${category.category}`}
                itemValue={`${countListTasks(category.tasks)}`}
                onClick={() => {
                  setTaskList({
                    category: category.category,
                    tasks: category.tasks,
                    color: category.color,
                  });
                  if (category.tasks.length) {
                    setTaskDetails(category.tasks[0]);
                    setMainTaskChanges({
                      date: category.tasks[0].date,
                      description: category.tasks[0].description,
                      title: category.tasks[0].title,
                      list: category.tasks[0].list,
                      listColor: category.tasks[0].listColor,
                      taskStatus: category.tasks[0].taskStatus,
                    });
                    setSubtasksChanges([...category.tasks[0].subtasks]);
                  } else {
                    setTaskDetails(undefined);
                    setMainTaskChanges(undefined);
                    setSubtasksChanges(undefined);
                  }
                }}
                key={`list category: ${category.category}`}
                icon={
                  <div
                    className="regular-icon me-2 rounded border-0 p-0"
                    style={{ backgroundColor: `${category.color}` }}
                  ></div>
                }
              />
            );
          })}
        />
        <div className="d-flex flex-row justify-content-between">
          <IconButton
            icon={<AddIcon className="regular-icon" />}
            txt="Add new list"
            size="sm"
            buttonClass="d-flex flex-row gap-2 ms-1 align-items-center txt-small text-secondary fw-semibold bg-transparent  border-0"
            function={() => {
              setShowModal(!showModal);
              setModalContent(<AddNewList />);
            }}
          />
          <IconButton
            icon={<SettingsIcon className="regular-icon" />}
            txt="Edit lists"
            size="sm"
            buttonClass="d-flex flex-row gap-2 ms-1 align-items-center txt-small text-secondary fw-semibold bg-transparent  border-0"
            function={() => {
              setShowModal(!showModal);
              setModalContent(<SettingsModalContent />);
            }}
          />
        </div>
      </Container>
      <Container className="d-flex flex-column gap-2 p-1 ">
        <IconButton
          icon={<SignOutIcon className="accordion-item-icon" />}
          txt="Sign out"
          size="sm"
          buttonClass="d-flex flex-row gap-2 align-items-center txt-small bg-transparent  border-0 text-secondary fw-semibold"
          function={() => {}}
        />
      </Container>
    </Container>
  );
}
