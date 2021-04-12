import {
  ColumnActions,
  KanBanColumnFields,
  ColumnGroupActions,
  ColumnGroupFields,
} from "../../components/columns";

export interface AppContextFields {
  Columns: KanBanColumnFields[];
  ColumnsDispatcher: React.Dispatch<ColumnActions>;
  ColumnGroups: ColumnGroupFields[];
  ColumnGroupsDispatcher: React.Dispatch<ColumnGroupActions>;
}
