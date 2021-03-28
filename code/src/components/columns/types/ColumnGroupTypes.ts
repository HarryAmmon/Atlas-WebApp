import { ColumnFields } from "..";

export interface ColumnGroupProps extends NewColumnGroupFields {
  columns: ColumnFields[];
}

export interface NewColumnGroupFields {
  groupTitle: string;
  limits: string;
  exitCriteria: string;
  groupId: string;
}

export interface ColumnGroupFields extends NewColumnGroupFields {}
