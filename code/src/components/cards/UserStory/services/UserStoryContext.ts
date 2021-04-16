import { createContext } from "react";
import { UserStoryContextProps } from "../types";

export const UserStoryContext = createContext<UserStoryContextProps>({
  userStory: {
    title: "",
    id: "",
    tasksId: [],
    archived: false,
    userStoryId: "",
    bugsId: [],
  },
  userStoryDispatcher: () => {},
  tasks: [],
  taskDispatcher: () => {},
  bugs: [],
  bugDispatcher: () => {},
});
