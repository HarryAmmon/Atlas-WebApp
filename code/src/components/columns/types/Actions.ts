import { DraggableLocation } from "react-beautiful-dnd";
import { ColumnFields } from "./ColumnTypes";

export type ColumnActions =
  | {
      type: "MOVE_CARD";
      CardSource: DraggableLocation;
      CardDestination: DraggableLocation | undefined;
    }
  | {
      type: "ADD_EXISTING_COLUMNS";
      Columns: ColumnFields[];
    };
