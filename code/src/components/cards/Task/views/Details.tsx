import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Form } from "react-final-form";
import { DetailsProps } from "../types";
import styles from "../../Details.module.scss";
import { CardDescription, CardTitle } from "../../../forms";
import { useGetTask } from "../services/useGetTask";

export const Details: React.FC<DetailsProps> = ({ id, handleClose }) => {
  const task = useGetTask(id);
  const handleSubmit = (values: any) => {
    console.log({ values });
  };

  const handleArchive = () => {
    console.log("Handling archive");
  };
  if (task !== undefined) {
    return (
      <DialogContent>
        <Form
          onSubmit={handleSubmit}
          validateOnBlur
          initialValues={{ Title: task.title, Description: task.description }}
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
