import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { UserStory } from "../../cards";
import { ColumnProps } from "../types/ColumnTypes";
import styles from "./Column.module.scss";

export const Column: React.FC<ColumnProps> = ({
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
                    key={story.userStoryId}
                    index={index}
                    draggableId={story.userStoryId}
                  >
                    {(provided) => (
                      <li
                        key={story.userStoryId}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <UserStory
                          userStoryId={story.userStoryId}
                          mode="summary"
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })
            ) : (
              <></>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </Box>
  );
};
