import { CardHeader } from "@material-ui/core";
import React, { useContext } from "react";
import { SummaryProps } from "../types";
import styles from "../../Summary.module.scss";
import { TaskContext } from "../services/TaskContext";

export const Summary: React.FC<SummaryProps> = () => {
  const taskContext = useContext(TaskContext);
  return (
    <CardHeader
      titleTypographyProps={{ variant: "body2" }}
      title={taskContext.Task.title}
      className={styles.root}
    />
  );
};
