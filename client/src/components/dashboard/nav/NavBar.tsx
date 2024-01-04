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
import { PiSignOutBold as SignOutIcon } from "react-icons/pi";
import { TaskList, useTasksContext } from "../../../context/tasksContext";
import { useModalContext } from "../../../context/modalContext";
import SettingsModalContent from "../../modal/SettingModalContent";
import countListTasks from "../../../utils/task-list/countListTasks";
import getTasksInDaysRange from "../../../utils/task-list/get/getTasksInDaysRange";
import AddNewList from "../../modal/AddNewListModalContent";
import signOutDB from "../../../utils/api/sign-out/signOut";

export default function NavBar() {
  const { taskLists, setCurrentList, setCurrentTask, prevTask } =
    useTasksContext();
  const { modalContext, setModalContext } = useModalContext();

  return (
    <div className="d-flex flex-column w-25 rounded justify-content-between bg-body-secondary p-3">
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
              itemValue={`${
                getTasksInDaysRange(
                  taskLists.filter(
                    (list: TaskList) => list.listActive === true
                  ),
                  7
                ).tasksAmount
              }`}
              onClick={() => {
                const { tasks } = getTasksInDaysRange(
                  taskLists.filter(
                    (list: TaskList) => list.listActive === true
                  ),
                  7
                );
                setCurrentList({
                  listName: "Upcoming",
                  listColor: "",
                  listActive: "",
                  tasks: tasks,
                });
                if (tasks.length) {
                  setCurrentTask(tasks[0]);
                  prevTask.current = tasks[0];
                } else {
                  setCurrentTask(undefined);
                  prevTask.current = undefined;
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
              itemValue={`${
                getTasksInDaysRange(
                  taskLists.filter(
                    (list: TaskList) => list.listActive === true
                  ),
                  0
                ).tasksAmount
              }`}
              onClick={() => {
                const { tasks } = getTasksInDaysRange(
                  taskLists.filter(
                    (list: TaskList) => list.listActive === true
                  ),
                  0
                );
                setCurrentList({
                  listName: "Today",
                  listColor: "",
                  listActive: "",
                  tasks: tasks,
                });
                if (tasks.length) {
                  setCurrentTask(tasks[0]);
                  prevTask.current = tasks[0];
                } else {
                  setCurrentTask(undefined);
                  prevTask.current = undefined;
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
          items={taskLists
            .filter((list) => list.listActive === true)
            .map((list: TaskList) => {
              return (
                <NavAccordionItem
                  itemStyle="accordion-item-txt text-secondary ms-auto"
                  headerStyle="txt-small text-secondary"
                  containerStyle="d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold"
                  header={`${list.listName}`}
                  itemValue={`${countListTasks(list.tasks)}`}
                  onClick={() => {
                    setCurrentList({
                      listName: list.listName,
                      tasks: list.tasks,
                      listColor: list.listColor,
                      listActive: list.listActive,
                    });
                    if (list.tasks.length) {
                      setCurrentTask(list.tasks[0]);
                      prevTask.current = list.tasks[0];
                    } else {
                      setCurrentTask(undefined);
                      prevTask.current = undefined;
                    }
                  }}
                  key={`list category: ${list.listName}`}
                  icon={
                    <div
                      className="regular-icon me-2 rounded border-0 p-0"
                      style={{ backgroundColor: `${list.listColor}` }}
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
            buttonClass="d-flex flex-row gap-2 ms-1 align-items-center text-secondary fw-semibold bg-transparent  border-0"
            buttonValClass="txt-small"
            function={() => {
              setModalContext({
                showModal: !modalContext.showModal,
                modalContent: <AddNewList />,
              });
            }}
          />
          <IconButton
            icon={<SettingsIcon className="regular-icon" />}
            txt="Edit lists"
            size="sm"
            buttonClass="d-flex flex-row gap-2 ms-1 align-items-center txt-small text-secondary fw-semibold bg-transparent  border-0"
            function={() => {
              setModalContext({
                showModal: !modalContext.showModal,
                modalContent: <SettingsModalContent />,
              });
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
          function={async () => {
            await signOutDB();
          }}
        />
      </Container>
    </div>
  );
}
