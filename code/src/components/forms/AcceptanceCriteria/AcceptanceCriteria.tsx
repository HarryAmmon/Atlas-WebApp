import { TextField } from "mui-rff";
import React from "react";
import Styles from "./AcceptanceCriteria.module.scss";

export const AcceptanceCriteria: React.FC = () => {
  return (
    <TextField
      className={Styles.root}
      id="acceptance-criteria"
      name="acceptanceCriteria"
      label="Acceptance Criteria"
      rows={6}
      variant="filled"
      multiline
    />
  );
};
