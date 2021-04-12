export interface UserStoryProps extends UserStoryId {
  className: string;
}

export interface UserStoryFields extends NewUserStoryFields {
  id: string;
  description?: string;
  acceptanceCriteria?: string;
  storyPoints?: string;
  tasksId: string[];
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
      UserStory: UserStoryFields;
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

export interface DetailsProps {
  userStoryId: string;
  showDetails: boolean;
  handleClose: () => void;
}

export interface SummaryProps {
  userStoryId: string;
}
