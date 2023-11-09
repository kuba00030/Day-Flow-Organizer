import { createContext } from "react";
import { TasksContextType } from "../types/TasksContextType";

export const TasksContext = createContext<TasksContextType | null>(null);
