import { Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { KanBanBoard } from "../components/boards/KanBanBoard";

export const Home = () => {
  useEffect(() => {
    console.log("home has rendered");
  });
  return (
    <React.Fragment>
      <Paper>
        <KanBanBoard title="Atlas Development Board" />
      </Paper>
    </React.Fragment>
  );
};
