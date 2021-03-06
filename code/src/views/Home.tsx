import React, { useContext } from "react";
import { UserStory } from "../components/cards";
import { AppContext } from "./components/AppContext";

export const Home = () => {
  const appContext = useContext(AppContext);

  return (
    <React.Fragment>
      {appContext.UserStories.map((story) => (
        <UserStory
          key={story.id}
          Mode="summary"
          UserStory={{
            id: story.id,
            title: story.title,
            description: story.description,
            acceptanceCriteria: story.acceptanceCriteria,
            storyPoints: story.storyPoints,
          }}
        />
      ))}
    </React.Fragment>
  );
};
