import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import styles from "../../Details.module.scss";
import { DetailsProps, UserStoryFields } from "../types";
import {
  CardTitle,
  CardDescription,
  AcceptanceCriteria,
  StoryPoints,
} from "../../../forms";
import { Form } from "react-final-form";
import { AppContext } from "../../../../views/components/AppContext";
import axios from "axios";
import { NewTask } from "../..";
import { UserStoryContext } from "../services/UserStoryContext";
import { Task } from "../../Task/Task";

interface NewTaskFields {
  TaskName: string;
}

type FormFields = UserStoryFields & NewTaskFields;

export const Details: React.FC<DetailsProps> = ({ handleClose }) => {
  const appContext = useContext(AppContext);
  const StoryContext = useContext(UserStoryContext);
  const UserStory = StoryContext.userStory;
  const [addTask, setAddTask] = useState<boolean>(false);
  const [formToSubmit, setFormToSubmit] = useState<"story" | "task" | "bug">(
    "story"
  );

  const handleValidate = (values: any) => {
    const errors: any = {};
    if (values.storyPoints <= 0) {
      errors.storyPoints = "Story Points Required";
    }
    if (!values.title) {
      errors.title = "Title Required";
    }
    return errors;
  };

  const submitStory = (values: UserStoryFields) => {
    const toSubmit = {
      ...values,
      id: UserStory.id,
      UserStoryId: UserStory.userStoryId,
      TasksId: UserStory.tasksId,
    };
    axios
      .put(`/UserStory/${UserStory.id}`, toSubmit)
      .then((response) => {
        StoryContext.userStoryDispatcher({
          type: "UPDATE_USER_STORY",
          UserStory: { ...UserStory, ...values },
        });
        handleClose();
      })
      .catch((err) => console.log(err.response));
  };

  const submitNewTask = (values: NewTaskFields) => {
    axios
      .post(`/Task/${UserStory.id}`, { title: values.TaskName })
      .then((result) => {
        console.log(result.data);
        StoryContext.userStoryDispatcher({
          type: "ADD_NEW_TASK",
          id: result.data.id,
        });
        setAddTask(false);
      })
      .catch((err) => console.warn(err));
  };

  const submitForm = (values: FormFields) => {
    if (formToSubmit === "story") {
      submitStory(values);
    } else if (formToSubmit === "task") {
      submitNewTask({ TaskName: values.TaskName });
    } else {
      console.log("submitting bug form");
    }
  };

  const handleArchive = () => {
    axios
      .delete(`/UserStory/${UserStory.id}`)
      .then((response) => {
        appContext.ColumnsDispatcher({
          type: "ARCHIVE_CARD",
          CardId: UserStory.id,
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <DialogContent>
      <Form
        onSubmit={submitForm}
        initialValues={{
          title: UserStory.title,
          description: UserStory.description,
          acceptanceCriteria: UserStory.acceptanceCriteria,
          storyPoints: UserStory.storyPoints,
        }}
        validateOnBlur
        validate={handleValidate}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box className={styles.titleBar}>
              <Typography variant="h5" className={styles.id}>
                {UserStory.userStoryId}
              </Typography>
              <CardTitle />
            </Box>
            <Box className={styles.menuBar}>
              <StoryPoints />
            </Box>
            <Box className={styles.body}>
              <Box className={styles.leftColumn}>
                <CardDescription />
                <AcceptanceCriteria />
              </Box>
              <Box className={styles.rightColumn}>
                <Box className={styles.titleAndButton}>
                  <Typography variant="h5" component="h3">
                    Tasks
                  </Typography>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setAddTask(true);
                      setFormToSubmit("task");
                    }}
                  >
                    Add Task
                  </Button>
                </Box>
                <Box className={styles.taskBox}>
                  <NewTask
                    display={addTask}
                    storyId={UserStory.id}
                    setDisplay={setAddTask}
                    name="TaskName"
                  />
                  {UserStory.tasksId.map((id) => (
                    <Task id={id} key={id} />
                  ))}
                </Box>
              </Box>
            </Box>
            <DialogActions>
              <Button
                className={styles.archiveButton}
                type="button"
                onClick={handleArchive}
                variant="outlined"
                color="secondary"
              >
                Archive
              </Button>
              <Button type="button" onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={() => {
                  setFormToSubmit("story");
                }}
              >
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </DialogContent>
  );
};
