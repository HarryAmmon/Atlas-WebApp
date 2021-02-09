import { Typography } from "@material-ui/core";
import React from "react";
import { UserStory } from "../components/cards";

export const Home = () => (
  <React.Fragment>
    <Typography variant="h1">Atlas</Typography>
    <UserStory id="123" title="Add a description to a card" />
    <UserStory id="124" title="Short description" />
  </React.Fragment>
);
