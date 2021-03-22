import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { AddButton } from "../components/buttons";
import { NewCard } from "../components/cards";
import { KanBanBoard } from "../components/boards/KanBanBoard";

export const Home = () => {
  const [newCard, setNewCard] = useState<boolean>(false);
  const handleClick = () => {
    setNewCard(true);
  };

  return (
    <React.Fragment>
      <Paper>
        <KanBanBoard title="My First Board" />
        <AddButton label="Add Card" onClick={handleClick} />
        <NewCard type="UserStory" display={newCard} setDisplay={setNewCard} />
      </Paper>
    </React.Fragment>
  );
};
