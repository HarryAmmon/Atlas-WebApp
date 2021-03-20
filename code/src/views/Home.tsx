import { Paper } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AddButton } from "../components/buttons";
import { NewCard, UserStory, UserStoryFields } from "../components/cards";
import { AppContext } from "./components/AppContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { KanBanBoard } from "../components/boards/KanBanBoard";

export const Home = () => {
  const appContext = useContext(AppContext);
  const [newCard, setNewCard] = useState<boolean>(false);
  const [userStories, setUserStories] = useState<UserStoryFields[]>(
    appContext.UserStories
  );
  const handleClick = () => {
    setNewCard(true);
  };

  return (
    <React.Fragment>
      <Paper>
        <KanBanBoard title="My First Board" />
        <AddButton label="Add Card" onClick={handleClick} />
        <DragDropContext
          onDragEnd={(result) => {
            const items = Array.from(userStories);
            const [reorderedItem] = items.splice(result.source.index, 1);
            if (result.destination !== undefined) {
              items.splice(result.destination.index, 0, reorderedItem);
              setUserStories(items);
            } else return;
          }}
        >
          <Droppable droppableId="backlog">
            {(provided) => (
              <ul
                id="backlog"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {userStories.map((story, index) => {
                  if (!story.archived) {
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
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <UserStory
                              mode="summary"
                              userStoryId={story.storyId}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  } else return <></>;
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <NewCard type="UserStory" display={newCard} setDisplay={setNewCard} />
      </Paper>
    </React.Fragment>
  );
};
