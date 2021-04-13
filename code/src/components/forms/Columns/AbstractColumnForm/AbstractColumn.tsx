import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { TextField } from "mui-rff";
import React from "react";
import { Form } from "react-final-form";
import { ColumnGroupFields } from "../../../columnGroup";
import styles from "./AbstractColumn.module.scss";

interface AbstractColumnProps {
  title: string;
  display: boolean;
  setDisplay: (state: boolean) => void;
  handleSubmit: (values: any) => void;
  initialValues?: ColumnGroupFields;
}

export const AbstractColumn: React.FC<AbstractColumnProps> = ({
  title,
  display,
  setDisplay,
  handleSubmit,
  initialValues,
}) => {
  return (
    <Dialog open={display} onClose={() => setDisplay(false)} maxWidth={"md"}>
      <DialogTitle>{title} Column</DialogTitle>
      <DialogContent>
        <Form
          onSubmit={handleSubmit}
          validate={(values: any) => {
            const errors: any = {};
            if (!values.GroupTitle) {
              errors.GroupTitle = "Enter a title";
            }
            if (!values.WIPLimit) {
              errors.WIPLimit = "Enter a WIP Limit";
            }
            if (values.WIPLimit <= 0) {
              errors.WIPLimit = "Limit must be greater than 0";
            }
            return errors;
          }}
          initialValues={{
            GroupTitle: initialValues?.groupTitle,
            WIPLimit: initialValues?.limits,
            ExitCriteria: initialValues?.exitCriteria,
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box className={styles.root}>
                <Box className={styles.titleAndLimits}>
                  <TextField
                    className={styles.columnTitle}
                    name="GroupTitle"
                    label="Title"
                    size="medium"
                  />
                  <TextField
                    className={styles.limit}
                    type="number"
                    name="WIPLimit"
                    label="Limit"
                  />
                </Box>
                <TextField
                  className={styles.criteria}
                  name="ExitCriteria"
                  label="Exit Criteria"
                  rows={3}
                  multiline
                />
                <DialogActions>
                  <Button
                    variant="text"
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => setDisplay(!display)}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    {title}
                  </Button>
                </DialogActions>
              </Box>
            </form>
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
