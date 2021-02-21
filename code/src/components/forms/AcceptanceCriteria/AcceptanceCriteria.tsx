import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { AcceptanceCriteriaInput } from "../types";

export const AcceptanceCriteria: React.FC<AcceptanceCriteriaInput> = ({
  children,
}) => {
  const [criteria, setCriteria] = useState<string>(children);

  return (
    <TextField
      id="acceptance-criteria"
      label="Acceptance Criteria"
      rows={6}
      variant="filled"
      value={criteria}
      onChange={(event) => setCriteria(event.target.value)}
      multiline
    />
  );
};
