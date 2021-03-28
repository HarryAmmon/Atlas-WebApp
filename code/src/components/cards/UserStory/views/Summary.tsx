import { CardHeader } from "@material-ui/core";
import React from "react";
import { useGetUserStory } from "../services/useGetUserStory";
import { SummaryProps } from "../types";
import styles from "./Summary.module.scss";

export const Summary: React.FC<SummaryProps> = ({ userStoryId }) => {
  const UserStory = useGetUserStory(userStoryId);

  return (
    <CardHeader
      title={UserStory.title}
      titleTypographyProps={{ variant: "body2" }}
      className={styles.root}
    />
  );
};
