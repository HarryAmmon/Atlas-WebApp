import { Card, CardHeader } from "@material-ui/core";
import React, { useContext } from "react";
import { ViewProps } from "../types";
import { UserStoryContext } from "../UserStoryContext";
import styles from "./Summary.module.scss";

export const Summary: React.FC<ViewProps> = ({ changeView }) => {
  const UserStory = useContext(UserStoryContext);
  return (
    <Card onClick={changeView} className={styles.root}>
      <CardHeader
        title={UserStory.title}
        titleTypographyProps={{ variant: "h6" }}
      />
    </Card>
  );
};
