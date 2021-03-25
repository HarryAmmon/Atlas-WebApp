export interface UserStoryProps extends UserStoryId {
  mode: "summary" | "detail";
}

export interface UserStoryFields extends NewUserStoryFields {
  id?: string;
  description?: string;
  acceptanceCriteria?: string;
  storyPoints?: string;
}

export interface NewUserStoryFields extends UserStoryId {
  title: string;
  archived: boolean;
}

export interface UserStoryId {
  userStoryId: string;
}

export type UserStoryActions =
  | {
      type: "GET_USER_STORY";
      id: string;
    }
  | {
      type: "ADD_NEW_USER_STORY";
      UserStory: NewUserStoryFields;
    }
  | {
      type: "DELETE_USER_STORY";
      StoryId: string;
    }
  | {
      type: "UPDATE_USER_STORY";
      UserStory: UserStoryFields;
    }
  | {
      type: "ADD_EXISTING_USER_STORIES";
      UserStories: UserStoryFields[];
    };

export interface ViewProps {
  userStoryId: string;
}

export interface BaseCardProps {
  className?: string;
  changeView?: () => void;
}
