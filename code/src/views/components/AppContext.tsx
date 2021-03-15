import { createContext } from "react";
import { AppContextFields } from "../types/AppContextFields";

export const AppContext = createContext<AppContextFields>({
  UserStories: [{ storyId: "1", title: "Default Title" }],
  UserStoriesDispatcher: () => {},
});
