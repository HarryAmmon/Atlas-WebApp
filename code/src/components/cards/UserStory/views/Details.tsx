import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
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
import { TaskFields } from "../../Task/types";
import { UserStoryContext } from "../services/UserStoryContext";
import { Task } from "../../Task/Task";

interface NewTaskFields {
  TaskName: string;
}

type FormFields = UserStoryFields & NewTaskFields;

export const Details: React.FC<DetailsProps> = ({ handleClose }) => {
  const appContext = useContext(AppContext);
  const Context = useContext(UserStoryContext);
  const UserStory = Context.userStory;
  const [addTask, setAddTask] = useState<boolean>(false);
  const [formToSubmit, setFormToSubmit] = useState<"story" | "task" | "bug">(
    "story"
  );
  const [tasks, setTasks] = useState<TaskFields[]>([]);

  useEffect(() => {
    UserStory.tasksId.forEach((id) => {
      axios.get(`/Task/${id}`).then((result) => {
        setTasks((tasks) => [...tasks, result.data]);
      });
    });
  }, [UserStory.tasksId]);

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
        if (response.status === 204) {
          appContext.UserStoriesDispatcher({
            type: "UPDATE_USER_STORY",
            UserStory: {
              id: UserStory.id,
              userStoryId: UserStory.userStoryId,
              title: values.title,
              storyPoints: values.storyPoints,
              description: values.description,
              acceptanceCriteria: values.acceptanceCriteria,
              archived: UserStory.archived,
              tasksId: UserStory.tasksId,
            },
          });
        }
      })
      .catch((err) => console.log(err.response));
  };

  const submitNewTask = (values: NewTaskFields) => {
    console.log("submitting new task");
    axios
      .post(`/Task/${UserStory.id}`, { title: values.TaskName })
      .then((result) => {
        console.log(result.data);
        appContext.UserStoriesDispatcher({
          type: "UPDATE_USER_STORY",
          UserStory: {
            id: UserStory.id,
            userStoryId: UserStory.userStoryId,
            title: UserStory.title,
            storyPoints: UserStory.storyPoints,
            description: UserStory.description,
            acceptanceCriteria: UserStory.acceptanceCriteria,
            archived: UserStory.archived,
            tasksId: [...UserStory.tasksId, result.data.id],
          },
        });
        // setAddTask(false);
      });
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
        if (response.status === 202) {
          appContext.UserStoriesDispatcher({
            type: "DELETE_USER_STORY",
            StoryId: UserStory.id,
          });
        }
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
                  {tasks.map((task) => (
                    <Task id={task.id} key={task.id} />
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
