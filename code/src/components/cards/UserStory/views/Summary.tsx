import { Box, Card, CardHeader, makeStyles, useTheme } from "@material-ui/core";
import React from "react";
import { SummaryProps } from "../types";

export const Summary: React.FC<SummaryProps> = ({ title, id, changeView }) => {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      borderLeft: `0.25rem solid ${theme.palette.primary.main}`,
      cursor: "pointer",
    },
  }));
  const classes = useStyles(theme);

  return (
    <Box display="flex" my={1}>
      <Card classes={{ root: classes.root }} onClick={changeView}>
        <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
      </Card>
    </Box>
  );
};
