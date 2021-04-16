import React, { useContext, useState } from "react";
import { UserStoryContext } from "../UserStory/services/UserStoryContext";
import { BugProps } from "./types";
import styles from "../Summary.module.scss";
import { Box, Checkbox, Dialog } from "@material-ui/core";
import { BaseCard } from "..";
import { Summary } from "./views/Summary";
import { Details } from "./views/Details";
import axios from "axios";

export const Bug: React.FC<BugProps> = ({ id, className }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const handleOpen = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);

  const story = useContext(UserStoryContext);

  return (
    <>
      <Box className={styles.checkboxWithSummary}>
        <Checkbox
          checked={story.bugs.find((x) => x.id === id)?.completed}
          onChange={() => {
            const bug = story.bugs.find((x) => x.id === id);
            if (bug) {
              axios
                .put(`Bug/${bug.id}`, {
                  ...bug,
                  completed: !bug.completed,
                })
                .then((result) => {
                  story.bugDispatcher({
                    type: "SET_COMPLETED",
                    id: bug.id,
                    completed: !bug.completed,
                  });
                })
                .catch((err) => console.warn(err));
            }
          }}
        />
        <BaseCard variant="Bug" className={className} changeView={handleOpen}>
          <Summary id={id} />
        </BaseCard>
      </Box>
      <Dialog open={showDetails} onClose={handleClose} maxWidth="xl" fullWidth>
        <Details showDetails={showDetails} handleClose={handleClose} id={id} />
      </Dialog>
    </>
  );
};
