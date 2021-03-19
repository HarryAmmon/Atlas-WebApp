import { UserStoryActions, UserStoryFields } from "../types";

export const reducer = (
  UserStories: UserStoryFields[],
  action: UserStoryActions
) => {
  switch (action.type) {
    case "UPDATE_USER_STORY": {
      const index = UserStories.findIndex(
        (story) => story.storyId === action.UserStory.storyId
      );
      UserStories[index] = action.UserStory;
      return [...UserStories];
    }

    case "ADD_NEW_USER_STORY":
      console.log(action.UserStory);
      UserStories = [...UserStories, action.UserStory];
      return [...UserStories];

    case "ADD_EXISTING_USER_STORIES":
      UserStories = [...UserStories, ...action.UserStories];
      return [...UserStories];

    case "DELETE_USER_STORY": {
      const index = UserStories.findIndex(
        (story) => story.id === action.StoryId
      );
      UserStories[index] = { ...UserStories[index], archived: true };
      return [...UserStories];
    }

    default:
      return [...UserStories];
  }
};
