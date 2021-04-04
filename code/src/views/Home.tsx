import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { KanBanBoard } from "../components/boards/KanBanBoard";
import { AddColumn } from "../components/forms";

export const Home = () => {
  const [displayPopUp, setDisplayPopUp] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Paper>
        <KanBanBoard title="My First Board" />

        <Button
          type="button"
          onClick={() => {
            setDisplayPopUp(!displayPopUp);
          }}
        >
          Add Column
        </Button>
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
      </Paper>
    </React.Fragment>
  );
};
