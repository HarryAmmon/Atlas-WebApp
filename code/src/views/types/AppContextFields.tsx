import {
  UserStoryActions,
  UserStoryFields,
} from "../../components/cards/UserStory/types";

export interface AppContextFields {
  UserStories: UserStoryFields[];
  UserStoriesDispatcher: React.Dispatch<UserStoryActions>;
}
