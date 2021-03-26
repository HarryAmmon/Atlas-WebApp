import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { AddButton } from "../components/buttons";
import { NewCard } from "../components/cards";
import { KanBanBoard } from "../components/boards/KanBanBoard";
import { AddColumn } from "../components/forms";

export const Home = () => {
  const [newCard, setNewCard] = useState<boolean>(false);
  const handleClick = () => {
    setNewCard(true);
  };

  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Paper>
        <KanBanBoard title="My First Board" />
        <AddButton label="Add Card" onClick={handleClick} />
        <Button
          type="button"
          onClick={() => {
            setDisplayPopUp(!displayPopUp);
          }}
        >
          Add Column
        </Button>
        {displayPopUp ? (
          <Dialog
            open={displayPopUp}
            onClose={() => setDisplayPopUp(false)}
            maxWidth={"md"}
          >
            <DialogTitle>Add Column</DialogTitle>
            <DialogContent>
              <AddColumn display={displayPopUp} setDisplay={setDisplayPopUp} />
            </DialogContent>
          </Dialog>
        ) : (
          <></>
        )}
        <NewCard type="UserStory" display={newCard} setDisplay={setNewCard} />
      </Paper>
    </React.Fragment>
  );
};
