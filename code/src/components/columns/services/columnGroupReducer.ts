import { ColumnGroupActions } from "../types/Actions";
import { ColumnGroupFields } from "../types/ColumnGroupTypes";

export const ColumnGroupReducer = (
  ColumnGroups: ColumnGroupFields[],
  action: ColumnGroupActions
) => {
  switch (action.type) {
    case "ADD_COLUMN_GROUP":
      const newColumnGroup: ColumnGroupFields = {
        groupId: action.ColumnGroup.groupId,
        groupTitle: action.ColumnGroup.groupTitle,
        exitCriteria: action.ColumnGroup.exitCriteria,
        limits: action.ColumnGroup.limits,
      };
      ColumnGroups = [...ColumnGroups, newColumnGroup];
      return [...ColumnGroups];

    case "ADD_COLUMN_GROUPS":
      ColumnGroups = [...ColumnGroups, ...action.ColumnGroups];
      return [...ColumnGroups];

    case "REMOVE_COLUMN_GROUP":
      const columnToRemove = ColumnGroups.findIndex(
        (x) => x.groupId === action.ColumnGroupId
      );
      if (columnToRemove !== -1) {
        ColumnGroups.splice(columnToRemove, 1);
      }
      return [...ColumnGroups];

    default:
      return [...ColumnGroups];
  }
};
