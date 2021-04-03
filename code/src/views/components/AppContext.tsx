import { createContext } from "react";
import { AppContextFields } from "../types/AppContextFields";

export const AppContext = createContext<AppContextFields>({
  UserStories: [{ userStoryId: "1", title: "Default Title", archived: true }],
  UserStoriesDispatcher: () => {},
  ColumnGroups: [{ groupId: "1", groupTitle: "", limits: 1, exitCriteria: "" }],
  ColumnGroupsDispatcher: () => {},
  Columns: [
    {
      groupId: "1",
      title: "Done",
      columnId: "1",
      userStoriesId: ["1"],
    },
  ],
  ColumnsDispatcher: () => {},
});
