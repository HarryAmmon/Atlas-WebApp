import React from "react";
import { Button } from "@material-ui/core";
import { AddButtonProps } from "../types";
import { Add } from "@material-ui/icons";

export const AddButton: React.FC<AddButtonProps> = ({
  onClick,
  className,
  label,
}) => (
  <Button variant="outlined" onClick={onClick} className={className}>
    <>
      {label}
      <Add />
    </>
  </Button>
);
