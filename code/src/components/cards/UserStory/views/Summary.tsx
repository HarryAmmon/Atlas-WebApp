import { Card, CardHeader } from "@material-ui/core";
import React, { useEffect } from "react";
import { useGetUserStory } from "../services/useGetUserStory";
import { ViewProps } from "../types";
import styles from "./Summary.module.scss";

export const Summary: React.FC<ViewProps> = ({ UserStoryId, changeView }) => {
  const UserStory = useGetUserStory(UserStoryId);

  useEffect(() => {
    console.log(UserStory);
  }, [UserStory]);

  return (
    <Card onClick={changeView} className={styles.root}>
      <CardHeader
        title={UserStory.title}
        titleTypographyProps={{ variant: "h6" }}
      />
    </Card>
  );
};
