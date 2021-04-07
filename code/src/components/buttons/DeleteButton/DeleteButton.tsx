import { Button, Typography } from "@material-ui/core";
import React from "react";
import { Delete } from "@material-ui/icons";
import styles from "./DeleteButton.module.scss";

export interface DeleteButtonProps {
  onClick: (a: any) => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick} className={styles.root}>
      <Delete />
      <Typography variant="body1">Delete</Typography>
    </Button>
  );
};
