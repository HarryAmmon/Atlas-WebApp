import { Button } from "@material-ui/core";
import React from "react";
import { MoreVert } from "@material-ui/icons";

export interface MenuButtonProps {
  onClick: (a: any) => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return (
    <Button type="button" onClick={onClick}>
      <MoreVert />
    </Button>
  );
};
