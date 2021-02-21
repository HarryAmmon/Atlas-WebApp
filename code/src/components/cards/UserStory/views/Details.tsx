import { Box, Paper, Typography } from "@material-ui/core";
import React from "react";
import Styles from "./Details.module.scss";
import { DetailsProps } from "../types";
import { CardTitle, CardDescription } from "../../../forms";

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
        <CardDescription>{description}</CardDescription>
      </Box>
    </Paper>
  );
};
