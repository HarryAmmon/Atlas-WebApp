import { Box, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Styles from "./Details.module.scss";
import { ViewProps } from "../types";
import {
  CardTitle,
  CardDescription,
  AcceptanceCriteria,
  StoryPoints,
} from "../../../forms";
import { UserStoryContext } from "../UserStoryContext";

export const Details: React.FC<ViewProps> = ({ changeView }) => {
  const UserStory = useContext(UserStoryContext);
  return (
    <Paper className={Styles.root}>
      <Box className={Styles.titleBar}>
        <Typography variant="h5" className={Styles.id}>
          {UserStory.id}
        </Typography>
        <CardTitle>{UserStory.title}</CardTitle>
      </Box>
      <Box className={Styles.body}>
        <Box className={Styles.leftColumn}>
          <CardDescription>{UserStory.description || ""}</CardDescription>
          <AcceptanceCriteria>
            {UserStory.acceptanceCriteria || ""}
          </AcceptanceCriteria>
        </Box>
        <Box className={Styles.rightColumn}>
          <StoryPoints>{UserStory.storyPoints || ""}</StoryPoints>
        </Box>
      </Box>
    </Paper>
  );
};
