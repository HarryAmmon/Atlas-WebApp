import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { CardDescriptionInput } from "../types";

export const CardDescription: React.FC<CardDescriptionInput> = ({
  children,
}) => {
  const [description, setDescription] = useState(children);
  return (
    <TextField
      id="card-description"
      label="Description"
      value={description}
      onChange={(event) => {
        setDescription(event.target.value);
      }}
      variant="filled"
      rows={4}
      multiline
    />
  );
};
