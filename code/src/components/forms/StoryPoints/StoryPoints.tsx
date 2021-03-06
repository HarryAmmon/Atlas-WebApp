import { TextField } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import { StoryPointsInput } from "../types";

export const StoryPoints: React.FC<StoryPointsInput> = ({ children }) => {
  const [storyPoints, setStoryPoints] = useState<string | null>(children);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const regex = /^[0-9.\b]+$/;
    if (
      event.target.value === "" ||
      (event.target.value.match(regex) && event.target.validity.valid)
    ) {
      console.log("chagned");
      setStoryPoints(event.target.value);
    }
  };

  return (
    <TextField
      type="number"
      name="StoryPoint"
      label="Story Points"
      variant="outlined"
      value={storyPoints}
      onChange={handleChange}
    />
  );
};
