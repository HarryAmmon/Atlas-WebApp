export interface ColumnGroupProps {
  id: string;
}

export interface NewColumnGroupFields {
  groupTitle: string;
  limits: number;
  exitCriteria: string;
  groupId: string;
}

export interface ColumnGroupFields extends NewColumnGroupFields {}
