import { DraggableLocation } from "react-beautiful-dnd";
import { NewColumnGroupFields } from "./ColumnGroupTypes";
import { ColumnFields, NewColumnFields } from "./ColumnTypes";

export type ColumnActions =
  | {
      type: "MOVE_CARD";
      CardSource: DraggableLocation;
      CardDestination: DraggableLocation | undefined;
    }
  | {
      type: "ADD_EXISTING_COLUMNS";
      Columns: ColumnFields[];
    }
  | {
      type: "ADD_NEW_COLUMN";
      NewColumnFields: NewColumnFields;
    };

export type ColumnGroupActions =
  | {
      type: "ADD_COLUMN_GROUP";
      ColumnGroup: NewColumnGroupFields;
    }
  | {
      type: "ADD_COLUMN_GROUPS";
      ColumnGroups: NewColumnGroupFields[];
    };
