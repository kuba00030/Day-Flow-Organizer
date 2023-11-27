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
import { CategoryType } from "../../../types/CategoryListType";
import SettingsModalContent from "../../modal/SettingModalContent";
export default function NavBar() {
  const { categoryList } = useContext(TasksContext);
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
              itemValue={`${0}`}
              onClick={() => {}}
              icon={
                <UpcomingIcon className="regular-icon me-2 text-secondary" />
              }
            />,
            <NavAccordionItem
              itemStyle="accordion-item-txt text-secondary ms-auto"
              headerStyle="txt-small text-secondary"
              containerStyle="d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold"
              header="Today"
              itemValue={`${0}`}
              onClick={() => {}}
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
          items={categoryList.map((category: CategoryType) => {
            return (
              <NavAccordionItem
                itemStyle="accordion-item-txt text-secondary ms-auto"
                headerStyle="txt-small text-secondary"
                containerStyle="d-flex flex-row align-items-center rounded border-0 bg-transparent fw-semibold"
                header={`${category.category}`}
                itemValue={`${category.numberOfTasks}`}
                onClick={() => {}}
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
