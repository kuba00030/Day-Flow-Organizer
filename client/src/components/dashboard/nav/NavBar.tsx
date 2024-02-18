import { Container } from "react-bootstrap";
import NavAccordion from "./NavAccordion";
import NavAccordionItem from "./NavAccordionItem";
import IconButton from "../../ui/buttons/IconButton";
import NavSearchBar from "./NavSearchBar";
import { MdOutlineKeyboardDoubleArrowRight as UpcomingIcon } from "react-icons/md";
import {
  LuListTodo as TodayIcon,
  LuCalendarDays as CalendarIcon,
} from "react-icons/lu";
import { CiSettings as SettingsIcon } from "react-icons/ci";
import { PiSignOutBold as SignOutIcon } from "react-icons/pi";
import { TaskList, useTasksContext } from "../../../context/tasksContext";
import { FaNoteSticky as NotesIcon } from "react-icons/fa6";
import { useModalContext } from "../../../context/modalContext";
import countListTasks from "../../../utils/task-list/countListTasks";
import getTasksInDaysRange from "../../../utils/task-list/get/getTasksInDaysRange";
import signOutDB from "../../../utils/api/sign-out/signOut";
import styleSelectedElement from "../../../utils/task-list/select/styleSelectedElement";
import AddNewListModalContent from "../../modal/add-list/AddNewListModalContent";
import SettingsModalContent from "../../modal/modal-settings/SettingModalContent";
import AddButton from "../../ui/buttons/AddButton";
import { useRef, useState } from "react";
import { IoIosArrowForward as ArrowIcon } from "react-icons/io";
import useSlideInOnClick from "../../../hooks/useSlideInOnClick";
import useNavigateTo from "../../../hooks/useNavigateTo";

export default function NavBar() {
  const { taskLists, setCurrentList, setCurrentTask, setEditedTask } =
    useTasksContext();
  const { modalContext, setModalContext } = useModalContext();
  const [navbarIsOpened, setNavbarIsOpened] = useState<boolean>(false);
  const navbarRef = useRef(null);
  const { navigateTo } = useNavigateTo();

  useSlideInOnClick(
    navbarRef,
    navbarIsOpened,
    setNavbarIsOpened,
    "left",
    20,
    1280
  );
  return (
    <div ref={navbarRef} className="navbar-container my-bg-darker p-0">
      <ArrowIcon
        className="h-100 my-color-lighter section-opener section-opener-navbar"
        style={{ width: "20px" }}
        onClick={() => {
          setNavbarIsOpened(!navbarIsOpened);
        }}
      />
      <div className="d-flex flex-column flex-1 p-4 my-scrollbar">
        <Container className="d-flex flex-column p-0 gap-2">
          <NavSearchBar />
          <NavAccordion
            header="TASKS"
            items={[
              <NavAccordionItem
                header="Upcoming"
                itemValue={
                  getTasksInDaysRange(taskLists, 7).filter(
                    (task) => task.taskStatus === false
                  ).length
                }
                onClick={(e) => {
                  const tasks = getTasksInDaysRange(taskLists, 7);

                  setCurrentList({
                    listName: "Upcoming",
                    listColor: "",
                    listActive: "",
                    tasks: tasks,
                  });

                  if (!tasks.length) {
                    setCurrentTask(undefined);
                    setEditedTask(undefined);
                  }

                  styleSelectedElement(
                    '[data-style*="navbar-list"]',
                    "data-style",
                    e,
                    "nav-accordion-item-focus"
                  );

                  navigateTo("/dashboard");
                }}
                icon={<UpcomingIcon className="regular-icon me-2" />}
              />,
              <NavAccordionItem
                header="Today"
                itemValue={
                  getTasksInDaysRange(taskLists, 0).filter(
                    (task) => task.taskStatus === false
                  ).length
                }
                onClick={(e) => {
                  const tasks = getTasksInDaysRange(taskLists, 0);

                  setCurrentList({
                    listName: "Today",
                    listColor: "",
                    listActive: "",
                    tasks: tasks,
                  });

                  if (!tasks.length) {
                    setCurrentTask(undefined);
                    setEditedTask(undefined);
                  }

                  styleSelectedElement(
                    '[data-style*="navbar-list"]',
                    "data-style",
                    e,
                    "nav-accordion-item-focus"
                  );

                  navigateTo("/dashboard");
                }}
                icon={<TodayIcon className="regular-icon me-2 " />}
              />,
              <NavAccordionItem
                header="Calendar"
                itemValue={undefined}
                onClick={(e) => {
                  styleSelectedElement(
                    '[data-style*="navbar-list"]',
                    "data-style",
                    e,
                    "nav-accordion-item-focus"
                  );

                  navigateTo("calendar");
                }}
                icon={<CalendarIcon className="regular-icon me-2" />}
              />,
              <NavAccordionItem
                header="Sticky Notes"
                itemValue={undefined}
                onClick={(e) => {
                  styleSelectedElement(
                    '[data-style*="navbar-list"]',
                    "data-style",
                    e,
                    "nav-accordion-item-focus"
                  );

                  navigateTo("sticky_notes");
                }}
                icon={<NotesIcon className="regular-icon me-2 " />}
              />,
            ]}
          />
          <NavAccordion
            header="LISTS"
            items={taskLists.map((list: TaskList) => {
              return (
                <NavAccordionItem
                  header={`${list.listName}`}
                  itemValue={countListTasks(
                    list.tasks.filter((task) => task.taskStatus === false)
                  )}
                  onClick={(e) => {
                    setCurrentList({
                      listName: list.listName,
                      tasks: list.tasks,
                      listColor: list.listColor,
                      listActive: list.listActive,
                    });

                    if (!list.tasks.length) {
                      setCurrentTask(undefined);
                      setEditedTask(undefined);
                    }

                    styleSelectedElement(
                      '[data-style*="navbar-list"]',
                      "data-style",
                      e,
                      "nav-accordion-item-focus"
                    );

                    navigateTo("/dashboard");
                  }}
                  key={`list category: ${list.listName}`}
                  icon={
                    <div
                      className="regular-icon me-2 rounded border-0 p-0"
                      style={{
                        backgroundColor: `${list.listColor}`,
                        pointerEvents: "none",
                      }}
                    ></div>
                  }
                />
              );
            })}
          />
          <div className="navbar-button-container justify-content-between mt-4">
            <AddButton
              txt="Add new list"
              size="sm"
              buttonClass="flex-row"
              buttonValClass="my-color-lighter txt-small"
              onClick={() => {
                setModalContext({
                  showModal: !modalContext.showModal,
                  modalContent: <AddNewListModalContent />,
                });
              }}
            />

            <IconButton
              icon={<SettingsIcon className="regular-icon" />}
              txt="Edit lists"
              size="sm"
              buttonClass="d-flex flex-row gap-2 ms-1 align-items-center txt-small my-color-light fw-semibold bg-transparent  border-0"
              buttonValClass="txt-small my-color-light"
              function={() => {
                setModalContext({
                  showModal: !modalContext.showModal,
                  modalContent: <SettingsModalContent />,
                });
              }}
            />
          </div>
        </Container>
        <Container className="d-flex flex-column p-1 mt-auto">
          <IconButton
            icon={<SignOutIcon />}
            txt="Sign out"
            buttonClass="d-flex flex-row gap-2 align-items-center txt-small btn-purple-outline my-color-lighter fw-semibold me-auto"
            function={async () => {
              await signOutDB().then(() => {
                navigateTo("/");
              });
            }}
          />
        </Container>
      </div>
    </div>
  );
}
