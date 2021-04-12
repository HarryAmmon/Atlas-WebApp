import { createContext } from "react";
import { AppContextFields } from "../types/AppContextFields";

export const AppContext = createContext<AppContextFields>({
  ColumnGroups: [{ groupId: "1", groupTitle: "", limits: 1, exitCriteria: "" }],
  ColumnGroupsDispatcher: () => {},
  Columns: [
    {
      groupId: "1",
      title: "Done",
      columnId: "1",
      userStoriesId: ["1"],
      visible: true,
      kanBanColumn: true,
    },
  ],
  ColumnsDispatcher: () => {},
});
