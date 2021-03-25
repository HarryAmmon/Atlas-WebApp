import { AppContext } from "../../../../views/components/AppContext";
import { UserStoryFields } from "../types";
import { useContext } from "react";

export const useGetUserStory = (id: string): UserStoryFields => {
  const appContext = useContext(AppContext);
  const user = appContext.UserStories.find((story) => story.userStoryId === id);
  if (user === undefined) {
    return { userStoryId: "-1", title: "not found", archived: true };
  }
  return user;
};
