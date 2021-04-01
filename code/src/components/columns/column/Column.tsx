import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { UserStory } from "../../cards";
import { ColumnProps } from "../types/ColumnTypes";
import styles from "./Column.module.scss";

export const Column: React.FC<ColumnProps> = ({
  title,
  userStoriesId,
  columnId,
}) => {
  return (
    <Box className={styles.root}>
      <Typography variant="h6" component="h4">
        {title}
      </Typography>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <ul id={title} {...provided.droppableProps} ref={provided.innerRef}>
            {userStoriesId.map((id, index) => {
              return (
                <Draggable key={Number(id)} index={index} draggableId={id}>
                  {(provided) => (
                    <li
                      key={index}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <UserStory userStoryId={id} mode="summary" />
                    </li>
                  )}
                </Draggable>
              );
            })}

            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </Box>
  );
};
