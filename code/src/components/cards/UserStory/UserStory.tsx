import React, { useEffect, useState } from "react";
import { UserStoryFields, UserStoryProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import styles from "./UserStory.module.scss";
import { Dialog } from "@material-ui/core";
import { BaseCard } from "..";
import { UserStoryContext } from "./services/UserStoryContext";
import axios from "axios";

export const UserStory: React.FC<UserStoryProps> = ({
  userStoryId,
  className,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleOpen = () => setShowDetails(true);

  const handleClose = () => setShowDetails(false);
  const [story, setStory] = useState<UserStoryFields>({
    title: "",
    id: "",
    tasksId: [],
    archived: false,
    userStoryId: "",
  });

  useEffect(() => {
    axios.get(`UserStory/${userStoryId}`).then((result) => {
      console.log(result.data);
      setStory(result.data);
    });
  }, [userStoryId]);

  return (
    <UserStoryContext.Provider value={{ userStory: story }}>
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
