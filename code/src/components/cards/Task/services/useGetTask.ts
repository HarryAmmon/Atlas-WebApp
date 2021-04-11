import { AppContext } from "../../../../views/components/AppContext";
import { TaskFields } from "../types";
import { useContext } from "react";

export const useGetTask = (id: string): TaskFields => {
  const appContext = useContext(AppContext);
  const task = appContext.Tasks.find((task) => task.id === id);
  if (task === undefined) {
    return { id: "-1", title: "Not Found", completed: false };
  }
  return task;
};
