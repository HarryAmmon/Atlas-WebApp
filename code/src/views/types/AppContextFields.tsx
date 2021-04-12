import {
  ColumnGroupActions,
  ColumnGroupFields,
} from "../../components/columns";

export interface AppContextFields {
  ColumnGroups: ColumnGroupFields[];
  ColumnGroupsDispatcher: React.Dispatch<ColumnGroupActions>;
}
