import React, { useState } from "react";
import { CardTitleInput } from "../types";
import Styles from "./CardTitle.module.scss";
import { makeStyles, TextField } from "@material-ui/core";

export const CardTitle: React.FC<CardTitleInput> = ({ children }) => {
  const [title, setTitle] = useState(children);
  const useStyles = makeStyles({
    input: {},
  });

  const classes = useStyles();

  return (
    <TextField
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      className={classes.input}
      inputProps={{ "aria-label": "description" }}
      fullWidth
      required
      InputProps={{ classes: { input: Styles.root } }}
    />
  );
};
