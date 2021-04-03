export interface BaseColumnFields {
  columnId: string;
  userStoriesId: string[];
  visible: boolean;
  title: string;
}
export interface DefaultColumnFields extends BaseColumnFields {}

export interface KanBanColumnFields extends BaseColumnFields {
  groupId: string;
}

export interface KanBanColumnProps extends BaseColumnFields {
  addCardButton?: boolean;
}
export interface DefaultColumnProps extends DefaultColumnFields {}
