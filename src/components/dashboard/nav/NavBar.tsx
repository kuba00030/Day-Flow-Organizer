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
import useNavigateTo from "../../../hooks/useNavigateTo";
import useOpenSection from "../../../hooks/useOpenSection";

export default function NavBar() {
  const {
    taskLists,
    currentList,
    setCurrentList,
    setCurrentTask,
    setEditedTask,
  } = useTasksContext();
  const { modalContext, setModalContext } = useModalContext();
  const [navbarIsOpened, setNavbarIsOpened] = useState<boolean>(false);
  const navbarRef = useRef(null);
  const navbarOpenerRef = useRef(null);
  const { navigateTo } = useNavigateTo();
  const { openSection } = useOpenSection();

  openSection(
    navbarRef,
    navbarOpenerRef,
    navbarIsOpened,
    setNavbarIsOpened,
    "left",
    1279
  );

  return (
    <div ref={navbarRef} className="navbar-container my-bg-darker p-0">
      <div
        ref={navbarOpenerRef}
        className="h-100 align-items-center section-opener-navbar section-opener"
        onClick={() => {
          setNavbarIsOpened(!navbarIsOpened);
        }}
      >
        <ArrowIcon
          className="my-color-lighter large-icon"
          style={{ transform: `rotate(${navbarIsOpened ? 180 : 0}deg)` }}
        />
      </div>

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
                  if (
                    currentList === undefined ||
                    currentList.listName !== "Upcoming"
                  ) {
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
                    } else {
                      setCurrentTask(tasks[0]);
                      setEditedTask(tasks[0]);
                    }

                    styleSelectedElement(
                      '[data-style*="navbar-list"]',
                      "data-style",
                      e,
                      "nav-accordion-item-focus"
                    );

                    navigateTo("/dashboard");
                  }
                }}
                icon={<UpcomingIcon className="regular-icon me-2" />}
              />,
              <NavAccordionItem
                header="Today"
                itemValue={
                  getTasksInDaysRange(taskLists, 1).filter(
                    (task) => task.taskStatus === false
                  ).length
                }
                onClick={(e) => {
                  if (
                    currentList === undefined ||
                    currentList.listName !== "Today"
                  ) {
                    const tasks = getTasksInDaysRange(taskLists, 1);

                    setCurrentList({
                      listName: "Today",
                      listColor: "",
                      listActive: "",
                      tasks: tasks,
                    });

                    if (!tasks.length) {
                      setCurrentTask(undefined);
                      setEditedTask(undefined);
                    } else {
                      setCurrentTask(tasks[0]);
                      setEditedTask(tasks[0]);
                    }

                    styleSelectedElement(
                      '[data-style*="navbar-list"]',
                      "data-style",
                      e,
                      "nav-accordion-item-focus"
                    );

                    navigateTo("/dashboard");
                  }
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
                  setCurrentList(undefined);
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
                  setCurrentList(undefined);
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
                    if (
                      currentList === undefined ||
                      currentList.listName !== list.listName
                    ) {
                      setCurrentList({
                        listName: list.listName,
                        tasks: list.tasks,
                        listColor: list.listColor,
                        listActive: list.listActive,
                      });

                      if (!list.tasks.length) {
                        setCurrentTask(undefined);
                        setEditedTask(undefined);
                      } else {
                        setCurrentTask(list.tasks[0]);
                        setEditedTask(list.tasks[0]);
                      }

                      styleSelectedElement(
                        '[data-style*="navbar-list"]',
                        "data-style",
                        e,
                        "nav-accordion-item-focus"
                      );

                      navigateTo("/dashboard");
                    }
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
              buttonTxt="Add new list"
              function={() => {
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
