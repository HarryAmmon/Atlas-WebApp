import { DraggableLocation } from "react-beautiful-dnd";
import { KanBanColumnFields } from "../../columns";

export interface BoardContextProps {
  KanBanColumns: KanBanColumnFields[];
  KanBanColumnDispatcher: React.Dispatch<BoardActions>;
}

export type BoardActions =
  | {
      type: "ADD_EXISTING_COLUMNS";
      columns: KanBanColumnFields[];
    }
  | { type: "ADD_NEW_COLUMN"; column: KanBanColumnFields }
  | {
      type: "MOVE_CARD";
      CardSource: DraggableLocation;
      CardDestination: DraggableLocation | undefined;
    }
  | { type: "ADD_CARD"; userStoryId: string }
  | { type: "REMOVE_CARD"; userStoryId: string };
