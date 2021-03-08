import React, { useContext } from "react";
import { UserStory } from "../components/cards";
import { AppContext } from "./components/AppContext";

export const Home = () => {
  const appContext = useContext(AppContext);

  return (
    <React.Fragment>
      {appContext.UserStories.map((story) => (
        <UserStory key={story.id} Mode="summary" UserStoryId={story.id} />
      ))}
    </React.Fragment>
  );
};
