import { Types } from "mongoose";

export interface UserStoryProps {
  userStoryId: string;
  mode: "summary" | "detail";
}

export interface UserStoryFields extends NewUserStoryFields {
  _id?: Types.ObjectId;
  storyId: string;
  description?: string;
  acceptanceCriteria?: string;
  storyPoints?: string;
}

export interface NewUserStoryFields {
  title: string;
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
      UserStory: UserStoryFields;
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
