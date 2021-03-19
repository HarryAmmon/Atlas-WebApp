import { createContext } from "react";
import { UserStoryFields } from "./types";

export const UserStoryContext = createContext<UserStoryFields>({
  storyId: "000000",
  title: "",
  archived: true,
});
