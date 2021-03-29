import { Box, Button, DialogActions, DialogContent } from "@material-ui/core";
import axios from "axios";
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
          console.log(values);

          axios
            .post("/ColumnGroup", {
              GroupTitle: values.GroupTitle,
              ExitCriteria: values.ExitCriteria,
              Limits: values.WIPLimit,
            })
            .then((result) => {
              appContext.ColumnGroupsDispatcher({
                type: "ADD_COLUMN_GROUP",
                ColumnGroup: {
                  groupTitle: result.data.groupTitle,
                  limits: result.data.limits,
                  exitCriteria: result.data.exitCriteria,
                  groupId: result.data.groupId,
                },
              });
            })
            .catch((err: any) => console.log(err.response.data));

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
          console.log("validating");
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
          console.log(errors);
          return errors;
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
