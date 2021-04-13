import { createContext } from "react";
import { BoardContextProps } from "../types";

export const BoardContext = createContext<BoardContextProps>({
  KanBanColumns: [],
  KanBanColumnDispatcher: () => {},
  ColumnGroups: [],
  ColumnGroupsDispatcher: () => {},
});
