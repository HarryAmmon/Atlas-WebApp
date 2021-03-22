import { UserStoryFields } from "../../cards";

export interface ColumnProps extends ColumnFields {
  columnGroupTitle: string;
}

export interface ColumnFields {
  columnTitle: string;
  columnId: string;
  stories?: UserStoryFields[];
}
