import { Box, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AddButton } from "../../buttons";
import { UserStory } from "../../cards";
import { NewUserStory } from "../../cards/UserStory/views/NewUserStory";
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
        <Typography variant="body1" component="h4">
          {title}
        </Typography>
        {addCardButton ? (
          <AddButton label="Add Card" onClick={handleClick} />
        ) : (
          <></>
        )}
      </Box>
      <Box className={styles.droppableContainer}>
        <Droppable droppableId={columnId}>
          {(provided, snapshot) => (
            <div
              id={columnId}
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? styles.draggingOver : ""
              } ${styles.droppable}`}
            >
              {userStoriesId.map((id, index) => {
                return (
                  <Draggable key={id} index={index} draggableId={id}>
                    {(provided, snapshot) => (
                      <div
                        key={index}
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <UserStory
                          userStoryId={id}
                          className={
                            snapshot.isDragging ? styles.draggingCard : ""
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}

              {provided.placeholder}
              <NewUserStory
                display={showNewCard}
                setDisplay={setShowNewCard}
                columnId={columnId}
                name="StoryTitle"
              />
            </div>
          )}
        </Droppable>
      </Box>
    </Box>
  );
};
