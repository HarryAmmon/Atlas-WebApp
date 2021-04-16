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
import axios from "axios";
import { NewTask } from "../..";
import { UserStoryContext } from "../services/UserStoryContext";
import { Task } from "../../Task/Task";
import { BoardContext } from "../../../boards/services/BoardContext";
import { NewBug } from "../../Bug/views/NewBug";
import { Bug } from "../../Bug/Bug";

interface NewTaskFields {
  TaskName: string;
}

interface NewBugFields {
  BugName: string;
}

type FormFields = UserStoryFields & NewTaskFields & NewBugFields;

export const Details: React.FC<DetailsProps> = ({ handleClose }) => {
  const StoryContext = useContext(UserStoryContext);
  const boardContext = useContext(BoardContext);
  const [addTask, setAddTask] = useState<boolean>(false);
  const [addBug, setAddBug] = useState<boolean>(false);
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
      id: StoryContext.userStory.id,
      UserStoryId: StoryContext.userStory.userStoryId,
      TasksId: StoryContext.userStory.tasksId,
      BugsId: StoryContext.userStory.bugsId,
    };
    axios
      .put(`/UserStory/${StoryContext.userStory.id}`, toSubmit)
      .then((response) => {
        StoryContext.userStoryDispatcher({
          type: "UPDATE_USER_STORY",
          UserStory: { ...StoryContext.userStory, ...values },
        });
        handleClose();
      })
      .catch((err) => console.log(err.response));
  };

  const submitNewTask = (values: NewTaskFields) => {
    axios
      .post(`/Task/${StoryContext.userStory.id}`, { title: values.TaskName })
      .then((result) => {
        StoryContext.userStoryDispatcher({
          type: "ADD_NEW_TASK",
          id: result.data.id,
        });
        setAddTask(false);
      })
      .catch((err) => console.warn(err));
  };

  const submitNewBug = (values: NewBugFields) => {
    axios
      .post(`/Bug/${StoryContext.userStory.id}`, { title: values.BugName })
      .then((result) => {
        StoryContext.userStoryDispatcher({
          type: "ADD_BUG",
          id: result.data.id,
        });
        setAddBug(false);
      })
      .catch((err) => console.warn(err));
  };

  const submitForm = (values: FormFields) => {
    if (formToSubmit === "story") {
      submitStory(values);
    } else if (formToSubmit === "task") {
      submitNewTask({ TaskName: values.TaskName });
    } else {
      submitNewBug({ BugName: values.BugName });
    }
  };

  const handleArchive = () => {
    axios
      .delete(`/UserStory/${StoryContext.userStory.id}`)
      .then((response) => {
        boardContext.KanBanColumnDispatcher({
          type: "REMOVE_CARD",
          userStoryId: StoryContext.userStory.id,
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <DialogContent>
      <Form
        onSubmit={submitForm}
        initialValues={{
          title: StoryContext.userStory.title,
          description: StoryContext.userStory.description,
          acceptanceCriteria: StoryContext.userStory.acceptanceCriteria,
          storyPoints: StoryContext.userStory.storyPoints,
        }}
        validateOnBlur
        validate={handleValidate}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box className={styles.titleBar}>
              <Typography variant="h5" className={styles.id}>
                {StoryContext.userStory.userStoryId}
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
                    storyId={StoryContext.userStory.id}
                    setDisplay={setAddTask}
                    name="TaskName"
                  />
                  {StoryContext.userStory.tasksId.map((id) => (
                    <Task id={id} key={id} />
                  ))}
                </Box>
                <Box className={styles.titleAndButton}>
                  <Typography variant="h5" component="h3">
                    Bugs
                  </Typography>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setAddBug(true);
                      setFormToSubmit("bug");
                    }}
                  >
                    Add Bug
                  </Button>
                </Box>
                <Box className={styles.taskBox}>
                  <NewBug
                    display={addBug}
                    storyId={StoryContext.userStory.id}
                    setDisplay={setAddTask}
                    name="BugName"
                  />
                  {StoryContext.userStory.bugsId.map((id) => (
                    <Bug id={id} key={id} />
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
