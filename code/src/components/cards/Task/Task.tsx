import { Dialog } from "@material-ui/core";
import React, { useState } from "react";
import { BaseCard } from "../BaseCard/BaseCard";
import { TaskProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";

export const Task: React.FC<TaskProps> = ({ id, className }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const handleOpen = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);
  return (
    <>
      <BaseCard variant="Task" className={className} changeView={handleOpen}>
        <Summary id={id} />
      </BaseCard>
      <Dialog open={showDetails} onClose={handleClose} maxWidth="xl" fullWidth>
        <Details id={id} showDetails={showDetails} handleClose={handleClose} />
      </Dialog>
    </>
  );
};
