import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext";
import getTaskLists from "../utils/api/get-data/getTaskLists";
import getTasksInDaysRange from "../utils/task-list/get/getTasksInDaysRange";

export type SubtaskType = {
  subtaskID: string;
  title: string;
  subtaskStatus: boolean;
  description: string | undefined;
};

export type Task = {
  start: string;
  end: string;
  description: string;
  taskStatus: boolean;
  title: string;
  taskID: string;
  list: string;
  listColor: string;
  subtasks: SubtaskType[];
};

export type TaskList = {
  listName: string;
  listColor: string;
  listActive: boolean | string;
  tasks: Task[];
};

export type TaskLists = TaskList[];

type TasksContext = {
  currentTask: Task;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task>>;
  editedTask: Task;
  setEditedTask: React.Dispatch<React.SetStateAction<Task>>;
  currentList: TaskList;
  setCurrentList: React.Dispatch<React.SetStateAction<TaskList>>;
  taskLists: TaskLists;
  setTaskLists: React.Dispatch<React.SetStateAction<TaskLists>>;
  isTaskOpened: true | false;
  setIsTaskOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TasksContext = createContext<TasksContext | null>(null);

export type ContextProviderProps = {
  children: React.ReactNode;
};

export default function TasksContextProvider({
  children,
}: ContextProviderProps) {
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const [editedTask, setEditedTask] = useState<Task | undefined>(undefined);
  const [currentList, setCurrentList] = useState<TaskList | undefined>({
    listName: "Today",
    listColor: "",
    listActive: true,
    tasks: [],
  });
  const [taskLists, setTaskLists] = useState<TaskLists>([]);
  const [isTaskOpened, setIsTaskOpened] = useState<boolean>(false);

  const { authContext } = useAuthContext();
  const fetchedTaskLists = async () => {
    const taskListsData = await getTaskLists(authContext.userID);
    return taskListsData;
  };

  useEffect(() => {
    if (authContext.userID) {
      fetchedTaskLists().then((taskListsData) => {
        setTaskLists(taskListsData);
        setCurrentTask(getTasksInDaysRange(taskListsData, 0)[0]);
        setCurrentList({
          listName: "Today",
          listColor: "",
          listActive: true,
          tasks: [...getTasksInDaysRange(taskListsData, 0)],
        });
      });
    }
  }, [authContext]);

  return (
    <TasksContext.Provider
      value={{
        currentTask,
        setCurrentTask,
        editedTask,
        setEditedTask,
        currentList,
        setCurrentList,
        taskLists,
        setTaskLists,
        isTaskOpened,
        setIsTaskOpened,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error(
      "useTaskContext should be used within a TasksContextProvider"
    );
  }
  return context;
}
