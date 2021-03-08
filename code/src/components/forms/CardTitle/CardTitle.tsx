import React from "react";
import { CardTitleInput } from "../types";
import Styles from "./CardTitle.module.scss";
import { TextField, showErrorOnBlur } from "mui-rff";

export const CardTitle: React.FC<CardTitleInput> = () => {
  return (
    <TextField
      className={Styles.root}
      type="text"
      name="CardTitle"
      showError={showErrorOnBlur}
      fullWidth={false}
      InputProps={{ classes: { input: Styles.input } }}
      required
    />
  );
};
