import { Box, Typography } from "@material-ui/core";
import React from "react";
import { UserStory } from "../../cards";
import { Li, Ul } from "../../typography/typography";
import { ColumnProps } from "../types/ColumnTypes";

export const Column: React.FC<ColumnProps> = ({ title, stories }) => {
  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Ul>
        {stories ? (
          stories.map((story, index) => (
            <Li>
              <UserStory userStoryId={story.storyId} mode="summary" />{" "}
            </Li>
          ))
        ) : (
          <></>
        )}
      </Ul>
    </Box>
  );
};
