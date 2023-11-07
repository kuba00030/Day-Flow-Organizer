import { Container } from "react-bootstrap";
import NavAccordion from "./NavAccordion";
import NavAccordionItem from "./NavAccordionItem";
import IconButton from "../../IconButton";
import NavSearchBar from "./NavSearchBar";
import {
  MdOutlineKeyboardDoubleArrowRight as UpcomingIcon,
  MdAdd as AddIcon,
} from "react-icons/md";
import {
  LuListTodo as TodayIcon,
  LuCalendarDays as CalendarIcon,
} from "react-icons/lu";
import { RiListSettingsLine as SettingsIcon } from "react-icons/ri";
import { PiSignOutBold as SignOutIcon } from "react-icons/pi";
export default function NavBar() {
  return (
    <Container className="d-flex flex-column w-25 rounded justify-content-between bg-body-secondary p-3">
      <Container className="d-flex flex-column p-0 gap-2">
        <NavSearchBar />
        <NavAccordion
          header="TASKS"
          items={[
            <NavAccordionItem
              header="Upcoming"
              icon={
                <UpcomingIcon className="accordion-item-icon me-2 text-secondary" />
              }
            />,
            <NavAccordionItem
              header="Today"
              icon={
                <TodayIcon className="accordion-item-icon me-2 text-secondary" />
              }
            />,
            <NavAccordionItem
              header="Calendar"
              icon={
                <CalendarIcon className="accordion-item-icon me-2 text-secondary" />
              }
            />,
          ]}
        />
        <NavAccordion
          header="LISTS"
          items={[
            <NavAccordionItem
              header="Personal"
              icon={
                <div className="accordion-item-icon accordion-item-icon-dot me-2 rounded"></div>
              }
            />,
            <NavAccordionItem
              header="Work"
              icon={
                <div className="accordion-item-icon accordion-item-icon-dot me-2 rounded"></div>
              }
            />,
          ]}
        />
        <IconButton
          icon={<AddIcon className="accordion-item-icon" />}
          txt="Add new list"
          buttonStyle="d-flex flex-row gap-2 ms-1 align-items-center accordion-item-txt text-secondary fw-semibold bg-transparent  border-0"
        />
      </Container>
      <Container className="d-flex flex-column gap-2 p-1 ">
        <IconButton
          icon={<SettingsIcon className="accordion-item-icon" />}
          txt="Settings"
          buttonStyle="d-flex flex-row gap-2 align-items-center accordion-item-txt bg-transparent  border-0 text-secondary fw-semibold"
        />
        <IconButton
          icon={<SignOutIcon className="accordion-item-icon" />}
          txt="Sign out"
          buttonStyle="d-flex flex-row gap-2 align-items-center accordion-item-txt bg-transparent  border-0 text-secondary fw-semibold"
        />
      </Container>
    </Container>
  );
}
