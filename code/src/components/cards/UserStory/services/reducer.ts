import { UserStoryActions, UserStoryFields } from "../types";

export const reducer = (
  UserStories: UserStoryFields[],
  action: UserStoryActions
) => {
  switch (action.type) {
    case "UPDATE_USER_STORY":
      const index = UserStories.findIndex(
        (story) => story.storyId === action.UserStory.storyId
      );
      UserStories[index] = action.UserStory;
      return [...UserStories];

    case "ADD_NEW_USER_STORY":
      const id = Math.floor(Math.random() * 20000);
      UserStories = [
        ...UserStories,
        { storyId: id.toString(), title: action.UserStory.title },
      ];
      return [...UserStories];

    case "ADD_EXISTING_USER_STORIES":
      UserStories = [...UserStories, ...action.UserStories];
      return [...UserStories];

    default:
      return [...UserStories];
  }
};
