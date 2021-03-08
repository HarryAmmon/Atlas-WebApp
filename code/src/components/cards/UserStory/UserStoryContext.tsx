import { createContext } from "react";
import { UserStoryFields } from "./types";

export const UserStoryContext = createContext<UserStoryFields>({
  id: "000000",
  title: "",
});
