import { CardHeader } from "@material-ui/core";
import React, { useContext } from "react";
import { SummaryProps } from "../types";
import styles from "../../Summary.module.scss";
import { UserStoryContext } from "../services/UserStoryContext";

export const Summary: React.FC<SummaryProps> = () => {
  const UserStory = useContext(UserStoryContext);

  return (
    <CardHeader
      title={UserStory.userStory.title}
      titleTypographyProps={{ variant: "body2" }}
      className={styles.root}
    />
  );
};
