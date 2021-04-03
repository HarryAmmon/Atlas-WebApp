import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AddButton } from "../../buttons";
import { NewCard, UserStory } from "../../cards";
import { KanBanColumnProps } from "../types/ColumnTypes";
import styles from "./KanBanColumn.module.scss";

export const KanBanColumn: React.FC<KanBanColumnProps> = ({
  title,
  userStoriesId,
  columnId,
  addCardButton = false,
}) => {
  const [showNewCard, setShowNewCard] = useState<boolean>(false);

  const handleClick = () => {
    setShowNewCard(true);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.titleAndButton}>
        <Typography variant="h6" component="h4">
          {title}
        </Typography>
        {addCardButton ? (
          <AddButton label="Add Card" onClick={handleClick} />
        ) : (
          <></>
        )}
      </Box>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <ul
            id={columnId}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {userStoriesId.map((id, index) => {
              return (
                <Draggable key={id} index={index} draggableId={id}>
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
            <NewCard
              type="UserStory"
              display={showNewCard}
              setDisplay={setShowNewCard}
              columnId={columnId}
            />
          </ul>
        )}
      </Droppable>
    </Box>
  );
};
