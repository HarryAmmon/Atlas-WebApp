import { DraggableLocation } from "react-beautiful-dnd";

export interface BaseColumnFields {
  columnId: string;
  userStoriesId: string[];
  visible: boolean;
  kanBanColumn: boolean;
  title: string;
}

export interface KanBanColumnFields extends BaseColumnFields {
  groupId: string;
}

export interface KanBanColumnProps {
  id: string;
  addCardButton?: boolean;
}

export type KanBanColumnActions =
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
  | { type: "REMOVE_CARD"; userStoryId: string }
  | { type: "DELETE_COLUMN"; ColumnId: string };
