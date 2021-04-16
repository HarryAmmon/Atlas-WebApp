import { UserStoryActions, UserStoryFields } from "../types";

export const reducer = (
  UserStory: UserStoryFields,
  action: UserStoryActions
) => {
  switch (action.type) {
    case "UPDATE_USER_STORY": {
      UserStory = action.UserStory;
      return { ...UserStory };
    }

    case "ADD_NEW_USER_STORY":
      UserStory = action.UserStory;
      return { ...UserStory };

    case "ADD_NEW_TASK":
      UserStory.tasksId = [...UserStory.tasksId, action.id];
      return { ...UserStory };
    case "REMOVE_TASK":
      const taskIndex = UserStory.tasksId.findIndex((x) => x === action.id);
      if (taskIndex) {
        UserStory.tasksId.splice(taskIndex, 1);
      }
      return { ...UserStory };
    case "ADD_BUG":
      UserStory.bugsId = [...UserStory.bugsId, action.id];
      return { ...UserStory };
    case "REMOVE_BUG":
      const bugIndex = UserStory.bugsId.findIndex((x) => x === action.id);
      if (bugIndex !== -1) {
        UserStory.bugsId.splice(bugIndex, 1);
      }
      return { ...UserStory };
    default:
      return { ...UserStory };
  }
};
