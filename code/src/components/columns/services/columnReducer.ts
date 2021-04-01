import { ColumnActions } from "../types/Actions";
import { ColumnFields } from "../types/ColumnTypes";

export const ColumnReducer = (
  Columns: ColumnFields[],
  action: ColumnActions
) => {
  switch (action.type) {
    case "MOVE_CARD": {
      if (action.CardSource === null || action.CardDestination === null) {
        return [...Columns];
      } else if (
        action.CardSource.droppableId === action.CardDestination?.droppableId
      ) {
        const sourceColumn = Columns.find(
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
        return [...Columns];
      } else {
        const sourceColumn = Columns.find(
          (x) => x.columnId === action.CardSource.droppableId
        );
        const destinationColumn = Columns.find(
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
        return [...Columns];
      }
    }
    case "ADD_EXISTING_COLUMNS": {
      Columns = [...Columns, ...action.Columns];
      return [...Columns];
    }
    case "ADD_NEW_COLUMN": {
      const newColumn: ColumnFields = {
        title: action.NewColumnFields.title,
        columnId: action.NewColumnFields.groupId,
        userStoriesId: [],
        groupId: action.NewColumnFields.groupId,
      };
      Columns = [...Columns, newColumn];
      return [...Columns];
    }
    default:
      return [...Columns];
  }
};
