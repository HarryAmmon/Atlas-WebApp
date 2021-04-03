import {
  UserStoryActions,
  UserStoryFields,
} from "../../components/cards/UserStory/types";
import {
  ColumnActions,
  KanBanColumnFields,
  ColumnGroupActions,
  ColumnGroupFields,
  DefaultColumnFields,
  DefaultColumnActions,
} from "../../components/columns";

export interface AppContextFields {
  UserStories: UserStoryFields[];
  UserStoriesDispatcher: React.Dispatch<UserStoryActions>;
  Columns: KanBanColumnFields[];
  ColumnsDispatcher: React.Dispatch<ColumnActions>;
  ColumnGroups: ColumnGroupFields[];
  ColumnGroupsDispatcher: React.Dispatch<ColumnGroupActions>;
  DefaultColumns: DefaultColumnFields[];
  DefaultColumnDispatcher: React.Dispatch<DefaultColumnActions>;
}
