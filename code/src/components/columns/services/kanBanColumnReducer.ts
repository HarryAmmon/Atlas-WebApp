import { ColumnActions } from "../types/Actions";
import { KanBanColumnFields } from "../types/ColumnTypes";

export const KanBanColumnReducer = (
  Columns: KanBanColumnFields[],
  action: ColumnActions
) => {
  switch (action.type) {
    case "MOVE_CARD": {
      if (
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
      const newColumn: KanBanColumnFields = {
        title: action.NewColumnFields.title,
        columnId: action.NewColumnFields.groupId,
        userStoriesId: [],
        groupId: action.NewColumnFields.groupId,
        visible: action.NewColumnFields.visible,
        kanBanColumn: action.NewColumnFields.kanBanColumn,
      };
      Columns = [...Columns, newColumn];
      return [...Columns];
    }
    case "ADD_NEW_CARD": {
      const columnToUpdate = Columns.filter(
        (x) => x.columnId === action.ColumnId
      );
      if (columnToUpdate) {
        columnToUpdate[0].userStoriesId = [
          ...columnToUpdate[0].userStoriesId,
          action.Card.id,
        ];
      }
      return [...Columns];
    }
    case "ARCHIVE_CARD": {
      Columns.forEach((column) => {
        const idIndex = column.userStoriesId.findIndex(
          (x) => x === action.CardId
        );
        if (idIndex !== -1) {
          column.userStoriesId.splice(idIndex, 1);

          const archiveColumn = Columns.find((x) => x.title === "Archived");
          if (archiveColumn) {
            archiveColumn.userStoriesId = [
              ...archiveColumn.userStoriesId,
              action.CardId,
            ];
          }
        }
      });
      return [...Columns];
    }
    case "DELETE_COLUMN": {
      const columnToRemove = Columns.findIndex(
        (x) => x.columnId === action.ColumnId
      );
      if (columnToRemove !== -1) {
        Columns.splice(columnToRemove, 1);
      }
      return [...Columns];
    }
    default:
      return [...Columns];
  }
};
