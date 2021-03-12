import { TextField } from "mui-rff";
import React from "react";
import { AcceptanceCriteriaInput } from "../types";
import Styles from "./AcceptanceCriteria.module.scss";

export const AcceptanceCriteria: React.FC<AcceptanceCriteriaInput> = () => {
  return (
    <TextField
      className={Styles.root}
      id="acceptance-criteria"
      name="AcceptanceCriteria"
      label="Acceptance Criteria"
      rows={6}
      variant="filled"
      multiline
    />
  );
};
