import { Paper } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AddButton } from "../components/buttons";
import { NewCard, UserStory } from "../components/cards";
import { AppContext } from "./components/AppContext";

export const Home = () => {
  const appContext = useContext(AppContext);
  const [newCard, setNewCard] = useState<boolean>(false);

  const handleClick = () => {
    setNewCard(true);
  };

  return (
    <React.Fragment>
      <Paper>
        <AddButton label="Add Card" onClick={handleClick} />
        {appContext.UserStories.map((story) => (
          <UserStory
            key={story.storyId}
            mode="summary"
            userStoryId={story.storyId}
          />
        ))}
        <NewCard type="UserStory" display={newCard} setDisplay={setNewCard} />
      </Paper>
    </React.Fragment>
  );
};
