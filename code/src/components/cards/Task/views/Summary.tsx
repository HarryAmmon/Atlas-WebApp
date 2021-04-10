import { CardHeader } from "@material-ui/core";
import React from "react";
import { SummaryProps } from "../types";
import styles from "../../Summary.module.scss";

export const Summary: React.FC<SummaryProps> = ({ id }) => {
  return (
    <CardHeader
      titleTypographyProps={{ variant: "body2" }}
      title="test title"
      className={styles.root}
    />
  );
};
