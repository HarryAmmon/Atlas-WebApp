import { createContext } from "react";
import { AppContextFields } from "../types/AppContextFields";

export const AppContext = createContext<AppContextFields>({
  ColumnGroups: [{ groupId: "1", groupTitle: "", limits: 1, exitCriteria: "" }],
  ColumnGroupsDispatcher: () => {},
});
