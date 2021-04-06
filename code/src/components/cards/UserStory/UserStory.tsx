import React, { useState } from "react";
import { UserStoryProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import { BaseCard } from "./views/BaseCard";
import styles from "./UserStory.module.scss";
import { Dialog } from "@material-ui/core";

export const UserStory: React.FC<UserStoryProps> = ({
  userStoryId,
  className,
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const handleOpen = () => setShowDetails(true);

  const handleClose = () => setShowDetails(false);

  return (
    <div>
      <BaseCard
        className={`${styles.summary} ${className}`}
        changeView={handleOpen}
      >
        <Summary userStoryId={userStoryId} />
      </BaseCard>
      <Dialog open={showDetails} onClose={handleClose} maxWidth="xl" fullWidth>
        <Details
          userStoryId={userStoryId}
          showDetails={showDetails}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
};
