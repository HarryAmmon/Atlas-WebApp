import { Box, Paper, TextField, Typography } from "@material-ui/core";
import React from "react";
import Styles from "./Details.module.scss";
import { DetailsProps } from "../types";
import { CardTitle, CardDescription, AcceptanceCriteria } from "../../../forms";

export const Details: React.FC<DetailsProps> = ({ id, title, description }) => {
  return (
    <Paper className={Styles.root}>
      <Box className={Styles.titleBar}>
        <Typography variant="h5" className={Styles.id}>
          {id}
        </Typography>
        <CardTitle>{title}</CardTitle>
      </Box>
      <Box className={Styles.body}>
        <Box className={Styles.leftColumn}>
          <CardDescription>{description}</CardDescription>
          <AcceptanceCriteria>
            Some example acceptance criteria
          </AcceptanceCriteria>
        </Box>
        <Box className={Styles.rightColumn}>
          <TextField
            type="number"
            id="story-points"
            label="Story Points"
            variant="outlined"
          />
        </Box>
      </Box>
    </Paper>
  );
};
