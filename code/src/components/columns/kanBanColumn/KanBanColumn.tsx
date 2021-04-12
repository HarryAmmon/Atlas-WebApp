import { Box, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AddButton } from "../../buttons";
import { UserStory } from "../../cards";
import { NewUserStory } from "../../cards/UserStory/views/NewUserStory";
import { KanBanColumnProps } from "./types/KanBanColumnTypes";
import styles from "./KanBanColumn.module.scss";
import { BoardContext } from "../../boards/services/BoardContext";

export const KanBanColumn: React.FC<KanBanColumnProps> = ({
  id,
  addCardButton = false,
}) => {
  const boardContext = useContext(BoardContext);

  const [showNewCard, setShowNewCard] = useState<boolean>(false);

  const handleClick = () => {
    setShowNewCard(true);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.titleAndButton}>
        <Typography variant="body1" component="h4">
          {boardContext.KanBanColumns.find((x) => x.columnId === id)?.title}
        </Typography>
        {addCardButton ? (
          <AddButton label="Add Card" onClick={handleClick} />
        ) : (
          <></>
        )}
      </Box>
      <Box className={styles.droppableContainer}>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              id={id}
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${
                snapshot.isDraggingOver ? styles.draggingOver : ""
              } ${styles.droppable}`}
            >
              {boardContext.KanBanColumns.find(
                (x) => x.columnId === id
              )?.userStoriesId.map((id, index) => {
                return (
                  <Draggable key={id} index={index} draggableId={id}>
                    {(provided, snapshot) => (
                      <div
                        key={id}
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
                columnId={id}
                name="Title"
              />
            </div>
          )}
        </Droppable>
      </Box>
    </Box>
  );
};
