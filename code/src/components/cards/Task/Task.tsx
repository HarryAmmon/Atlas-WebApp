import { Box, Checkbox, Dialog } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BaseCard } from "../BaseCard/BaseCard";
import { TaskProps } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import styles from "./Task.module.scss";
import { UserStoryContext } from "../UserStory/services/UserStoryContext";

export const Task: React.FC<TaskProps> = ({ id, className }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const handleOpen = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);

  const story = useContext(UserStoryContext);

  return (
    <>
      <Box className={styles.checkboxWithSummary}>
        <Checkbox
          onChange={() => {
            const task = story.tasks.find((x) => x.id === id);
            if (task) {
              axios
                .put(`Task/${task.id}`, {
                  ...task,
                  completed: !task?.completed,
                })
                .then((result) => {
                  story.taskDispatcher({
                    type: "SET_COMPLETED",
                    completed: !task.completed,
                    id: task.id,
                  });
                })
                .catch((err) => console.log(err));
            }
          }}
          checked={story.tasks.find((x) => x.id === id)?.completed}
        />
        <BaseCard variant="Task" className={className} changeView={handleOpen}>
          <Summary id={id} />
        </BaseCard>
      </Box>
      <Dialog open={showDetails} onClose={handleClose} maxWidth="xl" fullWidth>
        <Details showDetails={showDetails} handleClose={handleClose} id={id} />
      </Dialog>
    </>
  );
};
