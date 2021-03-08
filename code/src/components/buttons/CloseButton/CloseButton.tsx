import React from "react";
import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { CloseButtonProps } from "../types";

export const CloseButton: React.FC<CloseButtonProps> = ({
  className,
  onClick,
}) => {
  return (
    <Button className={className} variant="contained" onClick={onClick}>
      Close <Close />
    </Button>
  );
};
