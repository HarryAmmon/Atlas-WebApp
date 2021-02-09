import { Card, CardHeader, Box, makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React from "react";

export interface UserStoryProps {
  title: string;
  description?: string;
  id: string;
}

export const UserStory: React.FC<UserStoryProps> = ({ title, id }) => {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      borderLeft: `0.25rem solid ${theme.palette.primary.main}`,
    },
  }));
  const classes = useStyles(theme);

  return (
    <Box display="flex" my={1}>
      <Card classes={{ root: classes.root }}>
        <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
      </Card>
    </Box>
  );
};
