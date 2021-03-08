import { UserStoryActions, UserStoryFields } from "../types";

export const reducer = (
  UserStories: UserStoryFields[],
  action: UserStoryActions
) => {
  switch (action.type) {
    case "UPDATE_USER_STORY": {
      const index = UserStories.findIndex(
        (story) => story.id === action.UserStory.id
      );
      UserStories[index] = action.UserStory;
      return [...UserStories];
    }
    default:
      return [...UserStories];
  }
};
