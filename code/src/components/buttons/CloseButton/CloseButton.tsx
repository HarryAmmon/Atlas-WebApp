import React from "react";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { CloseButtonProps } from "../types";

export const CloseButton: React.FC<CloseButtonProps> = ({ className }) => {
  return (
    <Button className={className} variant="contained" type="submit">
      Close <Close />
    </Button>
  );
};
