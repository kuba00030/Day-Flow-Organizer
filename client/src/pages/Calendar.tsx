import "../styles/dashboard/calendar.css";
import Header from "../components/Header";
import {
  Task,
  TaskList,
  TaskLists,
  useTasksContext,
} from "../context/tasksContext";
import { useModalContext } from "../context/modalContext";
import AddTaskModalContent from "../components/modal/task/add-task/AddTaskModalContent";
import AddNewListModalContent from "../components/modal/add-list/AddNewListModalContent";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddButton from "../components/ui/buttons/AddButton";
import EditTaskModalContent from "../components/modal/task/edit-task/EditTaskModalContent";
import setTaskDB from "../utils/api/post-data/post/setTaskDB";
import { useAuthContext } from "../context/authContext";
import ListSelect from "../components/ui/inputs/ListSelect";
import { useEffect, useState } from "react";
import { SortingCategories } from "../utils/task-list/sort/sortTaskList";
import eventData, { EventData } from "../components/calendar/eventData";
import dateFormat from "../utils/task-details/dateFormat";

export default function Calendar() {
  const { taskLists, setTaskLists, setCurrentTask, setEditedTask } =
    useTasksContext();
  const { modalContext, setModalContext } = useModalContext();
  const { authContext } = useAuthContext();
  const [sortedEvents, setSortedEvents] = useState<EventData[]>(
    eventData(taskLists, "p-2 border-0 rounded eventHover")
  );
  const [sortListOptions, setSortListOptions] =
    useState<SortingCategories>("Ongoing");

  const updateTaskCalendar = (info): TaskLists => {
    const updatedTaskLists = taskLists.map((list) => {
      const updatedTasks = list.tasks.map((task) => {
        if (task.taskID === info.event.id) {
          return {
            ...task,
            start: dateFormat(info.event.startStr),
            end: dateFormat(info.event.endStr),
          };
        }
        return task;
      });
      return { ...list, tasks: updatedTasks };
    });
    return updatedTaskLists;
  };

  const getTaskList = (taskLists: TaskLists, listName: string): TaskList => {
    return taskLists.find((list) => list.listName === listName);
  };

  const getTask = (taskList: TaskList, taskID: string): Task => {
    return taskList.tasks.find((task) => task.taskID === taskID);
  };

  const handleEventDrop = (info) => {
    const updatedLists = updateTaskCalendar(info);

    const list = getTaskList(updatedLists, info.event.extendedProps.data.list);

    const task = getTask(list, info.event.id);

    setTaskDB(authContext.userID, task);

    setTaskLists(updatedLists);
  };

  const handleEventResize = (info) => {
    const updatedLists = updateTaskCalendar(info);

    const list = getTaskList(updatedLists, info.event.extendedProps.data.list);

    const task = getTask(list, info.event.id);

    setTaskDB(authContext.userID, task);

    setTaskLists(updatedLists);
  };

  const handleCLick = (info) => {
    const list = getTaskList(taskLists, info.event.extendedProps.data.list);

    const task = getTask(list, info.event.id);

    setCurrentTask(task);

    setEditedTask(task);

    setModalContext({
      modalContent: <EditTaskModalContent />,
      showModal: !modalContext.showModal,
    });
  };

  const sortEvents = () => {
    const events = [...eventData(taskLists, "p-2 border-0 rounded eventHover")];
    if (sortListOptions === "Ongoing") {
      setSortedEvents(
        events.filter((event) => event.data.taskStatus === false)
      );
    } else {
      setSortedEvents(events.filter((event) => event.data.taskStatus === true));
    }
  };

  useEffect(() => {
    sortEvents();
  }, [taskLists, sortListOptions]);

  return (
    <div className="d-flex flex-column flex-1 p-2 gap-4 fadeIn">
      <Header
        txt="Calendar"
        keyProp="Calendar"
        className="txt-larger fw-semibold ms-2 mb-2 my-color-light"
      />

      <div className="d-flex flex-row w-100">
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
          labelStyle="my-color-light"
          selectStyle="border-0 rounded fw-semibold txt-small text-start p-1 select-purple my-color-lighter p-2"
          optionStyle="fw-semibold txt-small"
          options={["Ongoing", "Done"]}
          selectedList={sortListOptions}
          onChange={(e) => {
            setSortListOptions(e.target.value);
          }}
        />
      </div>

      <FullCalendar
        events={sortedEvents}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        views={{
          timeGridWeek: {
            type: "timeGrid",
            duration: { weeks: 1 },
          },
          timeGridDay: {
            type: "timeGrid",
            duration: { days: 1 },
          },
        }}
        headerToolbar={{
          left: "prev,next,today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        initialView="dayGridMonth"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
        }}
        titleFormat={{ month: "short", year: "numeric" }}
        firstDay={1}
        editable={true}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventResizableFromStart={true}
        eventClick={handleCLick}
        nowIndicator={true}
        height={"100%"}
      />
    </div>
  );
}
