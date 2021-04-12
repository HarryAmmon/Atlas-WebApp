import { TextField, showErrorOnBlur } from "mui-rff";
import React from "react";

export const StoryPoints: React.FC = () => {
  return (
    <TextField
      type="number"
      name="storyPoints"
      label="Story Points"
      variant="outlined"
      fullWidth={false}
      showError={showErrorOnBlur}
      required
    />
  );
};
