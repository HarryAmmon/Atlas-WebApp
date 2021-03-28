import { Box, Button, DialogActions, DialogContent } from "@material-ui/core";
import { TextField } from "mui-rff";
import React, { useContext } from "react";
import { Form } from "react-final-form";
import { AppContext } from "../../../views/components/AppContext";
import styles from "./AddColumn.module.scss";

interface AddColumnProps {
  display: boolean;
  setDisplay: (state: boolean) => void;
}

export const AddColumn: React.FC<AddColumnProps> = ({
  display,
  setDisplay,
}) => {
  const appContext = useContext(AppContext);
  return (
    <DialogContent>
      <Form
        onSubmit={(values: any) => {
          const newGroupId = Math.floor(Math.random() * 10000).toString();

          appContext.ColumnGroupsDispatcher({
            type: "ADD_COLUMN_GROUP",
            ColumnGroup: {
              groupTitle: values.ColumnTitle,
              limits: values.WIPLimit,
              exitCriteria: values.ExitCriteria,
              groupId: newGroupId,
            },
          });

          appContext.ColumnsDispatcher({
            type: "ADD_NEW_COLUMN",
            NewColumnFields: {
              columnTitle: "Doing",
              groupId: newGroupId,
            },
          });

          appContext.ColumnsDispatcher({
            type: "ADD_NEW_COLUMN",
            NewColumnFields: {
              columnTitle: "Done",
              groupId: newGroupId,
            },
          });
        }}
        validate={(values: any) => {
          const errors: any = {};
          if (!values.ColumnTitle) {
            errors.ColumnTitle = "Enter a title";
          }
          if (!values.WIPLimit) {
            errors.WIPLimit = "Enter a WIP Limit";
          }
          if (values.WIPLimit <= 0) {
            errors.WIPLimit = "Limit must be greater than 0";
          }
          return errors;
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box className={styles.root}>
              <Box className={styles.titleAndLimits}>
                <TextField
                  className={styles.columnTitle}
                  name="ColumnTitle"
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
                  Add
                </Button>
              </DialogActions>
            </Box>
          </form>
        )}
      </Form>
    </DialogContent>
  );
};
