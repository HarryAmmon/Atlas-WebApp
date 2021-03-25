import { createContext } from "react";
import { AppContextFields } from "../types/AppContextFields";

export const AppContext = createContext<AppContextFields>({
  UserStories: [{ userStoryId: "1", title: "Default Title", archived: true }],
  UserStoriesDispatcher: () => {},
  ColumnGroups: [{ groupId: "1", groupTitle: "" }],
  Columns: [
    {
      groupId: "1",
      columnTitle: "Done",
      columnId: "1",
      stories: [
        {
          userStoryId: "1",
        },
      ],
    },
  ],
  ColumnsDispatcher: () => {},
});
