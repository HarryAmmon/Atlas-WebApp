import { AppContext } from "../../../../views/components/AppContext";
import { UserStoryFields } from "../types";
import { useContext } from "react";

export const useGetUserStory = (id: string): UserStoryFields => {
  const appContext = useContext(AppContext);
  const user = appContext.UserStories.find((story) => story.id === id);
  if (user === undefined) {
    return { id: "-1", title: "" };
  }
  return user;
};
