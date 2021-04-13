import { ColumnGroupActions, ColumnGroupFields } from "../../columnGroup";
import { KanBanColumnActions, KanBanColumnFields } from "../../kanBanColumn";

export interface BoardContextProps {
  KanBanColumns: KanBanColumnFields[];
  KanBanColumnDispatcher: React.Dispatch<KanBanColumnActions>;
  ColumnGroups: ColumnGroupFields[];
  ColumnGroupsDispatcher: React.Dispatch<ColumnGroupActions>;
}
