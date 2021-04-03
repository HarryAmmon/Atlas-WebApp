import { KanBanColumnFields } from "..";

export interface ColumnGroupProps extends NewColumnGroupFields {
  columns: KanBanColumnFields[];
}

export interface NewColumnGroupFields {
  groupTitle: string;
  limits: number;
  exitCriteria: string;
  groupId: string;
}

export interface ColumnGroupFields extends NewColumnGroupFields {}
