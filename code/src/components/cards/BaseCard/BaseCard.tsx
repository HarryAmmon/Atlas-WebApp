import React from "react";
import { Card } from "@material-ui/core";
import styles from "./BaseCard.module.scss";
import { BaseCardProps } from "./types";

export const BaseCard: React.FC<BaseCardProps> = ({
  children,
  className,
  changeView,
  variant,
}) => {
  return (
    <Card
      className={`${styles.baseCard} ${
        variant === "UserStory"
          ? styles.userStory
          : variant === "Task"
          ? styles.task
          : styles.bug
      } ${className}`}
      onClick={changeView}
    >
      {children}
    </Card>
  );
};
