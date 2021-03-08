export interface UserStoryProps {
  UserStoryId: string;
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
      type: "GET_USER_STORY";
      id: string;
    }
  | {
      type: "ADD_USER_STORY";
      UserStory: UserStoryFields;
    }
  | {
      type: "DELETE_USER_STORY";
      UserStory: UserStoryFields;
    }
  | {
      type: "UPDATE_USER_STORY";
      UserStory: UserStoryFields;
    };

export interface ViewProps {
  UserStoryId: string;
  changeView?: () => void;
}
