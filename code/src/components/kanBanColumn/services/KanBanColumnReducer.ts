import {
  KanBanColumnActions,
  KanBanColumnFields,
} from "../types/KanBanColumnTypes";

export const KanBanColumnReducer = (
  KanBanColumns: KanBanColumnFields[],
  action: KanBanColumnActions
) => {
  switch (action.type) {
    case "MOVE_CARD": {
      if (
        action.CardSource.droppableId === action.CardDestination?.droppableId
      ) {
        const sourceColumn = KanBanColumns.find(
          (x) => x.columnId === action.CardSource.droppableId
        );
        const removedCard = sourceColumn?.userStoriesId.splice(
          action.CardSource.index,
          1
        );
        if (removedCard !== undefined) {
          sourceColumn?.userStoriesId.splice(
            action.CardDestination?.index,
            0,
            removedCard[0]
          );
        }
        return [...KanBanColumns];
      } else {
        const sourceColumn = KanBanColumns.find(
          (x) => x.columnId === action.CardSource.droppableId
        );
        const destinationColumn = KanBanColumns.find(
          (x) => x.columnId === action.CardDestination?.droppableId
        );
        const movedCard = sourceColumn?.userStoriesId.splice(
          action.CardSource.index,
          1
        );
        if (
          action.CardDestination?.index !== undefined &&
          movedCard !== undefined
        ) {
          destinationColumn?.userStoriesId.splice(
            action.CardDestination?.index,
            0,
            movedCard[0]
          );
        }
        return [...KanBanColumns];
      }
    }
    case "DELETE_COLUMN": {
      const columnToDeleteIndex = KanBanColumns.findIndex(
        (x) => x.groupId === action.ColumnId
      );
      if (columnToDeleteIndex !== -1) {
        KanBanColumns.splice(columnToDeleteIndex, 1);
      }
      return [...KanBanColumns];
    }
    case "ADD_NEW_COLUMN": {
      KanBanColumns = [...KanBanColumns, action.column];
      return [...KanBanColumns];
    }
    case "ADD_EXISTING_COLUMNS": {
      KanBanColumns = action.columns;
      return [...KanBanColumns];
    }
    case "ADD_CARD": {
      const columnToAddTo = KanBanColumns.find((x) => x.title === "Backlog");
      if (columnToAddTo) {
        columnToAddTo.userStoriesId = [
          ...columnToAddTo.userStoriesId,
          action.userStoryId,
        ];
      }
      return [...KanBanColumns];
    }
    case "REMOVE_CARD": {
      KanBanColumns.forEach((column) => {
        const cardIndex = column.userStoriesId.findIndex(
          (x) => x === action.userStoryId
        );
        if (cardIndex !== -1) {
          column.userStoriesId.splice(cardIndex, 1);
          return [...KanBanColumns];
        }
      });
      return [...KanBanColumns];
    }
    default:
      return [...KanBanColumns];
  }
};
