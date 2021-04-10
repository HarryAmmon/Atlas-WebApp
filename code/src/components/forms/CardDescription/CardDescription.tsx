import { TextField } from "mui-rff";
import React from "react";

export const CardDescription: React.FC = () => {
  return (
    <TextField
      name="Description"
      id="card-description"
      label="Description"
      variant="filled"
      rows={4}
      multiline
    />
  );
};
