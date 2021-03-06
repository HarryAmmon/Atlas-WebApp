import React, { useState } from "react";
import { UserStoryProps } from "./types";
import { UserStoryContext } from "./UserStoryContext";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import { useHistory } from "react-router-dom";

export const UserStory: React.FC<UserStoryProps> = ({ UserStory, Mode }) => {
  const history = useHistory();
  const [view] = useState(Mode);
  const selectView = () => {
    switch (view) {
      case "summary":
        return (
          <Summary changeView={() => history.push(`/story/${UserStory.id}`)} />
        );
      case "detail":
        return <Details />;
    }
  };
  return (
    <UserStoryContext.Provider
      value={{
        id: UserStory.id,
        title: UserStory.title,
        description: UserStory.description,
        acceptanceCriteria: UserStory.acceptanceCriteria,
        storyPoints: UserStory.storyPoints,
      }}
    >
      {selectView()}
    </UserStoryContext.Provider>
  );
};
