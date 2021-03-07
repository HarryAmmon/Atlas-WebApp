import React from "react";
import { CardTitleInput } from "../types";
import Styles from "./CardTitle.module.scss";
import { TextField, showErrorOnBlur } from "mui-rff";

export const CardTitle: React.FC<CardTitleInput> = () => {
  return (
    <TextField
      type="text"
      name="CardTitle"
      showError={showErrorOnBlur}
      InputProps={{ classes: { input: Styles.root } }}
      required
      fullWidth
    />
  );
};
