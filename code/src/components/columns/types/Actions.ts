import { DraggableLocation } from "react-beautiful-dnd";
import { UserStoryFields } from "../../cards";
import { NewColumnGroupFields } from "./ColumnGroupTypes";
import { KanBanColumnFields } from "./ColumnTypes";

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
    }
  | {
      type: "ADD_NEW_CARD";
      ColumnId: string;
      Card: UserStoryFields;
    }
  | {
      type: "ARCHIVE_CARD";
      CardId: string;
    }
  | {
      type: "DELETE_COLUMN";
      ColumnId: string;
    };

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
    };
