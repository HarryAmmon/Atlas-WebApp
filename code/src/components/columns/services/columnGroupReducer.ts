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

    default:
      return [...ColumnGroups];
  }
};
