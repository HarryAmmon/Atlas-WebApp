export interface BaseColumnFields {
  columnId: string;
  userStoriesId: string[];
  visible: boolean;
  kanBanColumn: boolean;
  title: string;
}

export interface KanBanColumnFields extends BaseColumnFields {
  groupId: string;
}

export interface KanBanColumnProps extends BaseColumnFields {
  addCardButton?: boolean;
}
