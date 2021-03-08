export interface UserStoryProps {
  UserStory: UserStoryFields;
  Mode: "summary" | "detail";
}

export interface UserStoryFields {
  id: string;
  title: string;
  description?: string;
  acceptanceCriteria?: string;
  storyPoints?: string;
}

export type UserStoryActions =
  | {
      type: "ADD_USER_STORY";
      UserStory: UserStoryFields;
    }
  | {
      type: "DELETE_USER_STORY";
      UserStory: UserStoryFields;
    }
  | {
      type: "UPDATE_USER_STORy";
      UserStory: UserStoryFields;
    };

export interface ViewProps {
  changeView?: () => void;
}
