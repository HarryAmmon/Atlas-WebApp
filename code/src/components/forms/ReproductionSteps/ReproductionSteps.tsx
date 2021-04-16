import { TextField } from "mui-rff";
import React from "react";

export const ReproductionSteps: React.FC = () => {
  return (
    <TextField
      name="reproductionSteps"
      id="reproduction-steps"
      label="Reproduction Steps"
      variant="filled"
      rows={4}
      multiline
    />
  );
};
