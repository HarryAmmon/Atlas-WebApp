import { NewColumnGroupFields } from "./ColumnGroupTypes";

export type ColumnGroupActions =
  | {
      type: "ADD_COLUMN_GROUP";
      ColumnGroup: NewColumnGroupFields;
    }
  | {
      type: "ADD_COLUMN_GROUPS";
      ColumnGroups: NewColumnGroupFields[];
    }
  | {
      type: "REMOVE_COLUMN_GROUP";
      ColumnGroupId: string;
    }
  | {
      type: "EDIT_COLUMN_GROUP";
      ColumnGroup: NewColumnGroupFields;
    };
