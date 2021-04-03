import { DefaultColumnActions } from "..";
import { DefaultColumnFields } from "../types/ColumnTypes";

export const DefaultColumnReducer = (
  Columns: DefaultColumnFields[],
  action: DefaultColumnActions
) => {
  switch (action.type) {
    case "ADD_EXISTING_DEFAULT_COLUMNS":
      Columns = action.DefaultColumns;
      return [...Columns];

    case "ADD_NEW_CARD":
      const addToColumn = Columns.find((x) => x.columnId === action.ColumnId);
      if (addToColumn) {
        addToColumn.userStoriesId.push(action.Card.id);
      }
      return [...Columns];

    default:
      return [...Columns];
  }
};
