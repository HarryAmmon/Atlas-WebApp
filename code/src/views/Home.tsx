import { Paper } from "@material-ui/core";
import React from "react";
import { KanBanBoard } from "../components/boards/KanBanBoard";

export const Home = () => {
  return (
    <React.Fragment>
      <Paper>
        <KanBanBoard title="Atlax Development Board" />
      </Paper>
    </React.Fragment>
  );
};
