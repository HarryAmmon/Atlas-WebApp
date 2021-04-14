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
import axios from "axios";
import { UserStoryContext } from "../../UserStory/services/UserStoryContext";

export const Details: React.FC<DetailsProps> = ({ handleClose, id }) => {
  const storyContext = useContext(UserStoryContext);
  const task = storyContext.tasks.find((x) => x.id === id);
  if (task) {
    const handleSubmit = (values: any) => {
      axios
        .put(`Task/${task.id}`, {
          ...task,
          title: values.title,
          description: values.description,
        })
        .then((result) => {
          storyContext.taskDispatcher({
            type: "UPDATE_TASK",
            Task: {
              ...task,
              title: values.title,
              description: values.description,
            },
          });
          handleClose();
        })
        .catch((err) => console.warn(err));
    };

    const handleArchive = () => {
      axios.delete(`Task/${task.id}`, {}).then((result) => {
        storyContext.userStoryDispatcher({
          type: "REMOVE_TASK",
          id: task.id,
        });
      });
    };
    return (
      <DialogContent>
        <Form
          onSubmit={handleSubmit}
          validateOnBlur
          initialValues={{
            title: task.title,
            description: task.description,
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
  } else {
    return <></>;
  }
};
