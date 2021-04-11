import { Box, Checkbox } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { AppContext } from "../../../../views/components/AppContext";
import { useGetTask } from "../services/useGetTask";
import { Task } from "../Task";
import { SummaryProps } from "../types";
import styles from "./TaskWithCheckbox.module.scss";

export const TaskWithCheckBox: React.FC<SummaryProps> = ({ id }) => {
  const task = useGetTask(id);
  const appContext = useContext(AppContext);
  const [checked, setChecked] = useState(task.completed);
  return (
    <Box className={styles.root}>
      <Checkbox
        onChange={
          () =>
            appContext.TasksDispatcher({
              type: "SET_COMPLETED",
              id: id,
              completed: !task.completed,
            })
          // setChecked(!checked)
        }
        // checked={checked}
        checked={task.completed}
      />
      <Task id={id} />
    </Box>
  );
};
