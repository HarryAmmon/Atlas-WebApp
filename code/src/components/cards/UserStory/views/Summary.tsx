import { CardHeader } from "@material-ui/core";
import React from "react";
import { useGetUserStory } from "../services/useGetUserStory";
import { ViewProps } from "../types";
import styles from "./Summary.module.scss";

export const Summary: React.FC<ViewProps> = ({ userStoryId }) => {
  const UserStory = useGetUserStory(userStoryId);

  return (
    <CardHeader
      title={UserStory.title}
      titleTypographyProps={{ variant: "body1" }}
      className={styles.root}
    />
  );
};
