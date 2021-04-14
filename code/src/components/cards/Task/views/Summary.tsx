import { CardHeader } from "@material-ui/core";
import React, { useContext } from "react";
import { SummaryProps } from "../types";
import styles from "../../Summary.module.scss";
import { UserStoryContext } from "../../UserStory/services/UserStoryContext";

export const Summary: React.FC<SummaryProps> = ({ id }) => {
  const storyContext = useContext(UserStoryContext);
  return (
    <CardHeader
      titleTypographyProps={{ variant: "body2" }}
      title={storyContext.tasks.find((x) => x.id === id)?.title}
      className={styles.root}
    />
  );
};
