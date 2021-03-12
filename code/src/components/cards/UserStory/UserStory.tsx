import React from "react";
import { UserStoryProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import { useHistory } from "react-router-dom";
import { BaseCard } from "./views/BaseCard";
import styles from "./UserStory.module.scss";

export const UserStory: React.FC<UserStoryProps> = ({ userStoryId, mode }) => {
  const history = useHistory();
  const selectView = () => {
    switch (mode) {
      case "summary":
        return (
          <BaseCard
            className={styles.summary}
            changeView={() => history.push(`/story/${userStoryId}`)}
          >
            <Summary userStoryId={userStoryId} />
          </BaseCard>
        );
      case "detail":
        return (
          <BaseCard className={styles.details}>
            <Details userStoryId={userStoryId} />
          </BaseCard>
        );
    }
  };
  return selectView();
};
