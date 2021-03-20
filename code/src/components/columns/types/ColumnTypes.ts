import { UserStoryFields } from "../../cards";

export interface ColumnProps extends ColumnFields {}

export interface ColumnFields {
  title: string;
  stories?: UserStoryFields[];
}
