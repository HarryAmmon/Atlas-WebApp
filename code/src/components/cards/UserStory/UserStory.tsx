import React, { useEffect, useReducer, useState } from "react";
import { UserStoryFields, UserStoryProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import styles from "./UserStory.module.scss";
import { Dialog } from "@material-ui/core";
import { BaseCard } from "..";
import { UserStoryContext } from "./services/UserStoryContext";
import axios from "axios";
import { reducer } from "./services/reducer";

export const UserStory: React.FC<UserStoryProps> = ({
  userStoryId,
  className,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const handleOpen = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);
  let tempStory: UserStoryFields = {
    id: "",
    title: "",
    archived: false,
    tasksId: [],
    userStoryId: "",
  };
  const [story, storyDispatcher] = useReducer(reducer, tempStory);

  useEffect(() => {
    console.log("use effect user story");
    axios.get(`UserStory/${userStoryId}`).then((result) => {
      storyDispatcher({ type: "ADD_NEW_USER_STORY", UserStory: result.data });
    });
  }, [userStoryId]);

  return (
    <UserStoryContext.Provider
      value={{ userStory: story, userStoryDispatcher: storyDispatcher }}
    >
      <BaseCard
        className={`${styles.summary} ${className}`}
        changeView={handleOpen}
        variant="UserStory"
      >
        <Summary />
      </BaseCard>
      <Dialog open={showDetails} onClose={handleClose} maxWidth="xl" fullWidth>
        <Details showDetails={showDetails} handleClose={handleClose} />
      </Dialog>
    </UserStoryContext.Provider>
  );
};
