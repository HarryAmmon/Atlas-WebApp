import React from "react";
import { Button } from "@material-ui/core";
import { Save, Close } from "@material-ui/icons";
import { SaveAndCloseProps } from "../types";
import { useHistory } from "react-router-dom";
import styles from "./SaveAndClose.module.scss";

export const SaveAndClose: React.FC<SaveAndCloseProps> = ({ dirty }) => {
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  const CloseButton = () => (
    <Button className={styles.root} variant="contained" onClick={handleClick}>
      Close
      <Close />
    </Button>
  );

  const SaveAndCloseButton = () => (
    <Button
      className={styles.root}
      variant="contained"
      type="submit"
      onClick={handleClick}
    >
      Save and Close
      <Save />
    </Button>
  );

  if (dirty) {
    return <SaveAndCloseButton />;
  } else {
    return <CloseButton />;
  }
};
