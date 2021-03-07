import { TextField, showErrorOnBlur } from "mui-rff";
import React from "react";
import { StoryPointsInput } from "../types";

export const StoryPoints: React.FC<StoryPointsInput> = () => {
  return (
    <TextField
      type="number"
      name="StoryPoint"
      label="Story Points"
      variant="outlined"
      showError={showErrorOnBlur}
      required
    />
  );
};
