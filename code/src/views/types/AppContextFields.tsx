import {
  UserStoryActions,
  UserStoryFields,
} from "../../components/cards/UserStory/types";
import {
  ColumnActions,
  ColumnFields,
  ColumnGroupFields,
} from "../../components/columns";

export interface AppContextFields {
  UserStories: UserStoryFields[];
  UserStoriesDispatcher: React.Dispatch<UserStoryActions>;
  Columns: ColumnFields[];
  ColumnsDispatcher: React.Dispatch<ColumnActions>;
  ColumnGroups: ColumnGroupFields[];
}
