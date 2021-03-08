import React from "react";
import { UserStoryProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import { useHistory } from "react-router-dom";

export const UserStory: React.FC<UserStoryProps> = ({ UserStoryId, Mode }) => {
  const history = useHistory();
  const selectView = () => {
    switch (Mode) {
      case "summary":
        return (
          <Summary
            UserStoryId={UserStoryId}
            changeView={() => history.push(`/story/${UserStoryId}`)}
          />
        );
      case "detail":
        return <Details UserStoryId={UserStoryId} />;
    }
  };
  return <>{selectView()}</>;
};
