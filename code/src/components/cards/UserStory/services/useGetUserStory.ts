import { AppContext } from "../../../../views/components/AppContext";
import { UserStoryFields } from "../types";
import { useContext } from "react";

export const useGetUserStory = (id: string): UserStoryFields => {
  const appContext = useContext(AppContext);
  const user = appContext.UserStories.find((story) => story.storyId === id);
  if (user === undefined) {
    return { storyId: "-1", title: "", archived: true };
  }
  return user;
};
