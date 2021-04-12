import { TaskFields } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";

export const useGetTask = (id: string): TaskFields => {
  const [task, setTask] = useState<TaskFields>({
    id: "-1",
    title: "-1",
    completed: false,
  });
  useEffect(() => {
    axios
      .get(`Task/${id}`)
      .then((result) => setTask(result.data))
      .catch((err) => console.warn(err));
  });
  return task;
};
