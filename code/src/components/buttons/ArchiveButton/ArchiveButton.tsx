import React from "react";
import { Button } from "@material-ui/core";
import { Archive } from "@material-ui/icons";

interface ArchiveButtonProps {
  onClick: () => void;
}
export const ArchiveButton: React.FC<ArchiveButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <Archive /> Archive
    </Button>
  );
};
