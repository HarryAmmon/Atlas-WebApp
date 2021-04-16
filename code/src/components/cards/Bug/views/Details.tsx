import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import { Form } from "react-final-form";
import { DetailsProps } from "../../Task/types";
import styles from "../../Details.module.scss";
import { CardDescription, CardTitle } from "../../../forms";
import { UserStoryContext } from "../../UserStory/services/UserStoryContext";
import axios from "axios";
import { BugFields } from "../types";

export const Details: React.FC<DetailsProps> = ({
  id,
  handleClose,
  showDetails,
}) => {
  const story = useContext(UserStoryContext);
  const bug = story.bugs.find((x) => x.id === id);
  if (bug) {
    const handleSubmit = (values: any) => {
      const toSubmit: BugFields = {
        id: bug.id,
        description: values.description,
        completed: bug.completed,
        title: values.title,
        reproductionSteps: bug.reproductionSteps,
      };
      axios.put(`Bug/${bug.id}`, toSubmit).then((result) => {
        story.bugDispatcher({
          type: "UPDATE_BUG",
          Bug: toSubmit,
        });
        handleClose();
      });
    };
    const handleArchive = () => {
      axios.delete(`Bug/${bug.id}`).then((result) => {
        story.userStoryDispatcher({ type: "REMOVE_BUG", id: bug.id });
      });
    };

    return (
      <DialogContent>
        <Form
          onSubmit={handleSubmit}
          validateOnBlur
          initialValues={{ title: bug.title, description: bug.description }}
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
