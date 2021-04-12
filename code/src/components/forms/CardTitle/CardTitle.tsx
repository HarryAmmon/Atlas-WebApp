import React from "react";
import Styles from "./CardTitle.module.scss";
import { TextField, showErrorOnBlur } from "mui-rff";

export const CardTitle: React.FC = () => {
  return (
    <TextField
      className={Styles.root}
      type="text"
      name="title"
      showError={showErrorOnBlur}
      fullWidth={false}
      InputProps={{ classes: { input: Styles.input } }}
      required
    />
  );
};
