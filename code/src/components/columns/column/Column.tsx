import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { UserStory } from "../../cards";
import { ColumnProps } from "../types/ColumnTypes";
import styles from "./Column.module.scss";

export const Column: React.FC<ColumnProps> = ({
  columnGroupTitle,
  columnTitle,
  stories,
  columnId,
}) => {
  return (
    <Box className={styles.root}>
      <Typography variant="h4">{columnTitle}</Typography>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <ul
            id={columnTitle}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {stories ? (
              stories.map((story, index) => {
                return (
                  <Draggable
                    key={story.storyId}
                    index={index}
                    draggableId={story.storyId}
                  >
                    {(provided) => (
                      <li
                        key={story.storyId}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <UserStory userStoryId={story.storyId} mode="summary" />
                      </li>
                    )}
                  </Draggable>
                );
              })
            ) : (
              <></>
            )}
          </ul>
        )}
      </Droppable>
    </Box>
  );
};
