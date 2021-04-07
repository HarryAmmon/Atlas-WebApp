import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Edit } from "@material-ui/icons";
import styles from "./EditButton.module.scss";

export interface EditButtonProps {
  onClick: (a: any) => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick} className={styles.root}>
      <Edit />
      <Typography variant="body1">Edit</Typography>
    </Button>
  );
};
