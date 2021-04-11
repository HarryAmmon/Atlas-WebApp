import { CardHeader } from "@material-ui/core";
import React from "react";
import { SummaryProps } from "../types";
import styles from "../../Summary.module.scss";
import { useGetTask } from "../services/useGetTask";

export const Summary: React.FC<SummaryProps> = ({ id }) => {
  const task = useGetTask(id);
  return (
    <CardHeader
      titleTypographyProps={{ variant: "body2" }}
      title={task.completed ? "completed" : "Not completed"}
      className={styles.root}
    />
  );
};
