import { TaskListType, TaskListsType } from "../../types/CategoryListType";
import { SubtaskType } from "../../types/TaskType";

export default function addTask(
  taskLists: TaskListsType,
  taskList: TaskListType,
  setTaskList,
  setTaskLists,
  listID: string,
  date: string,
  description: string,
  title: string,
  listName: string,
  listColor: string,
  subtasks: SubtaskType[]
) {
  const index = taskLists.map((list) => list.listID).indexOf(listID);
  taskLists[index].tasks = [
    ...taskLists[index].tasks,
    {
      date: date,
      description: description,
      taskStatus: false,
      title: title,
      list: listName,
      listColor: listColor,
      subtasks: subtasks,
    },
  ];
  if (taskList.listName === listName) {
    setTaskList({
      ...taskList,
      tasks: [
        ...taskList.tasks,
        {
          date: date,
          title: title,
          description: description,
          subtasks: subtasks,
          taskStatus: false,
          list: listName,
          listColor: listColor,
        },
      ],
    });
  }
  setTaskLists([...taskLists]);
}
