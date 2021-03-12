import React from "react";
import { Button } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import { SaveAndCloseButtonProps } from "../types";

export const SaveAndCloseButton: React.FC<SaveAndCloseButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <Button className={className} variant="contained" type="submit">
      Save and Close
      <Save />
    </Button>
  );
};
