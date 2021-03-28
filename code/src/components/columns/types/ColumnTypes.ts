import { UserStoryId } from "../../cards";

export interface NewColumnFields {
  columnTitle: string;
  groupId: string;
}

export interface ColumnFields extends NewColumnFields {
  columnId: string;
  stories: UserStoryId[];
}

export interface ColumnProps extends ColumnFields {
  columnGroupTitle: string;
}
