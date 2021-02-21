import { Typography } from "@material-ui/core";
import React from "react";
import { UserStory } from "../components/cards";

export const Home = () => (
  <React.Fragment>
    <Typography variant="h1">Atlas</Typography>
    <UserStory
      id="123567"
      title="Add a description to a card"
      description="This is the first card"
    />
    <UserStory
      id="124567"
      title="Card title"
      description={"This is the second card"}
    />
  </React.Fragment>
);
