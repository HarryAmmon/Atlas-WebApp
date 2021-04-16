import { BugActions, BugFields, BugId } from "../../Bug/types";
import { TaskActions, TaskFields, TaskId } from "../../Task/types";

export interface UserStoryProps extends UserStoryId {
  className: string;
}

export interface UserStoryFields extends NewUserStoryFields {
  id: string;
  description?: string;
  acceptanceCriteria?: string;
  storyPoints?: string;
  tasksId: string[];
  bugsId: string[];
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
      type: "ADD_NEW_USER_STORY";
      UserStory: UserStoryFields;
    }
  | {
      type: "UPDATE_USER_STORY";
      UserStory: UserStoryFields;
    }
  | {
      type: "ADD_NEW_TASK";
      id: TaskId;
    }
  | { type: "REMOVE_TASK"; id: TaskId }
  | { type: "ADD_BUG"; id: BugId }
  | { type: "REMOVE_BUG"; id: BugId };

export interface DetailsProps {
  showDetails: boolean;
  handleClose: () => void;
}

export interface SummaryProps {}

export interface UserStoryContextProps {
  userStory: UserStoryFields;
  userStoryDispatcher: React.Dispatch<UserStoryActions>;
  tasks: TaskFields[];
  taskDispatcher: React.Dispatch<TaskActions>;
  bugs: BugFields[];
  bugDispatcher: React.Dispatch<BugActions>;
}
