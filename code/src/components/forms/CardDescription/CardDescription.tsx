import { TextField } from "mui-rff";
import React from "react";
import { CardDescriptionInput } from "../types";

export const CardDescription: React.FC<CardDescriptionInput> = () => {
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
