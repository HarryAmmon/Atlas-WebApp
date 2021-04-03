import { DraggableLocation } from "react-beautiful-dnd";
import { UserStoryFields } from "../../cards";
import { NewColumnGroupFields } from "./ColumnGroupTypes";
import { DefaultColumnFields, KanBanColumnFields } from "./ColumnTypes";

export type ColumnActions =
  | {
      type: "MOVE_CARD";
      CardSource: DraggableLocation;
      CardDestination: DraggableLocation | undefined;
    }
  | {
      type: "ADD_EXISTING_COLUMNS";
      Columns: KanBanColumnFields[];
    }
  | {
      type: "ADD_NEW_COLUMN";
      NewColumnFields: KanBanColumnFields;
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

export type DefaultColumnActions =
  | {
      type: "ADD_EXISTING_DEFAULT_COLUMNS";
      DefaultColumns: DefaultColumnFields[];
    }
  | {
      type: "ADD_NEW_CARD";
      ColumnId: string;
      Card: UserStoryFields;
    };
