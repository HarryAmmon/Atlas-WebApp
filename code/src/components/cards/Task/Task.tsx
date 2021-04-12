import { Box, Checkbox, Dialog } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { BaseCard } from "../BaseCard/BaseCard";
import { TaskContext } from "./services/TaskContext";
import { TaskReducer } from "./services/TaskReducer";
import { TaskProps, TaskFields } from "./types";
import { Details } from "./views/Details";
import { Summary } from "./views/Summary";
import styles from "./Task.module.scss";

export const Task: React.FC<TaskProps> = ({ id, className }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  let task: TaskFields = { id: "", title: "", completed: false };
  const handleOpen = () => setShowDetails(true);
  const handleClose = () => setShowDetails(false);
  const [taskState, taskDispatcher] = useReducer(TaskReducer, task);

  useEffect(() => {
    axios
      .get(`Task/${id}`)
      .then((result) =>
        taskDispatcher({ type: "ADD_TASK", Task: result.data })
      );
  }, [id]);

  return (
    <TaskContext.Provider
      value={{ Task: taskState, TaskDispatcher: taskDispatcher }}
    >
      <Box className={styles.checkboxWithSummary}>
        <Checkbox
          onChange={() => {
            axios
              .put(`Task/${taskState.id}`, {
                ...taskState,
                completed: !taskState.completed,
              })
              .then((result) => {
                console.log("success");
                taskDispatcher({
                  type: "SET_COMPLETED",
                  completed: !taskState.completed,
                });
              })
              .catch((err) => console.log(err));
          }}
          checked={taskState.completed}
        />
        <BaseCard variant="Task" className={className} changeView={handleOpen}>
          <Summary />
        </BaseCard>
      </Box>
      <Dialog open={showDetails} onClose={handleClose} maxWidth="xl" fullWidth>
        <Details showDetails={showDetails} handleClose={handleClose} />
      </Dialog>
    </TaskContext.Provider>
  );
};
