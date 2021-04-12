import { createContext } from "react";
import { TaskContextProps } from "../types";

export const TaskContext = createContext<TaskContextProps>({
  Task: {
    title: "",
    id: "",
    completed: false,
  },
  TaskDispatcher: () => {},
});
