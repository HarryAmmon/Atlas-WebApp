import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Form } from "react-final-form";
import { DetailsProps } from "../types";
import styles from "../../Details.module.scss";
import { CardDescription, CardTitle } from "../../../forms";
import { TaskContext } from "../services/TaskContext";
import axios from "axios";
import { UserStoryContext } from "../../UserStory/services/UserStoryContext";

export const Details: React.FC<DetailsProps> = ({ handleClose }) => {
  const taskContext = useContext(TaskContext);
  const storyContext = useContext(UserStoryContext);
  const handleSubmit = (values: any) => {
    axios
      .put(`Task/${taskContext.Task.id}`, {
        ...taskContext.Task,
        title: values.title,
        description: values.description,
      })
      .then((result) => {
        taskContext.TaskDispatcher({
          type: "UPDATE_TASK",
          Task: {
            ...taskContext.Task,
            title: values.title,
            description: values.description,
          },
        });
        handleClose();
      })
      .catch((err) => console.warn(err));
  };

  const handleArchive = () => {
    axios.delete(`Task/${taskContext.Task.id}`, {}).then((result) => {
      storyContext.userStoryDispatcher({
        type: "REMOVE_TASK",
        id: taskContext.Task.id,
      });
    });
  };
  return (
    <DialogContent>
      <Form
        onSubmit={handleSubmit}
        validateOnBlur
        initialValues={{
          title: taskContext.Task.title,
          description: taskContext.Task.description,
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box className={styles.titleBar}>
              <Typography variant="h5" className={styles.id}>
                ID
              </Typography>
              <CardTitle />
            </Box>
            <Box className={styles.menuBar}></Box>
            <Box className={styles.body}>
              <CardDescription />
            </Box>
            <DialogActions>
              <Button
                type="button"
                className={styles.archiveButton}
                onClick={handleArchive}
                variant="outlined"
                color="secondary"
              >
                Archive
              </Button>
              <Button type="button" onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </DialogContent>
  );
};
