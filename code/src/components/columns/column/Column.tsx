import { Box, Typography } from "@material-ui/core";
import React from "react";
import { UserStory } from "../../cards";
import { ColumnProps } from "../types/ColumnTypes";

export const Column: React.FC<ColumnProps> = ({ title, stories }) => {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <ul>
        {stories ? (
          stories.map((story, index) => (
            <li>
              <UserStory userStoryId={story.storyId} mode="summary" />{" "}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </Box>
  );
};
