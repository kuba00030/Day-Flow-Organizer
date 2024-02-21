import { TaskLists } from "../../context/tasksContext";

export type EventData = {
  id: string;
  end: string;
  start: string;
  title: string;
  backgroundColor: string;
  className: string;
  data: {
    list: string;
    taskStatus: boolean;
  };
};
export default function eventData(eventLists: TaskLists, eventStyle: string) {
  const events: EventData[] = [];

  eventLists.forEach((list) => {
    list.tasks.forEach((task) => {
      const event: EventData = {
        id: task.taskID,
        end: task.end,
        start: task.start,
        title: task.title,
        backgroundColor: task.listColor,
        data: {
          list: task.list,
          taskStatus: task.taskStatus,
        },
        className: eventStyle,
      };
      events.push(event);
    });
  });
  return events;
}
