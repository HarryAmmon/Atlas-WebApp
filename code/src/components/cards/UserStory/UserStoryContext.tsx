import { createContext } from "react";
import { UserStoryFields } from "./types";

export const UserStoryContext = createContext<UserStoryFields>({
  userStoryId: "000000",
  title: "",
  archived: true,
  id: "2",
  tasksId: [],
});
