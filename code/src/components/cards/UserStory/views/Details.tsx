import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import styles from "./Details.module.scss";
import { DetailsProps } from "../types";
import {
  CardTitle,
  CardDescription,
  AcceptanceCriteria,
  StoryPoints,
} from "../../../forms";
import { ArchiveButton } from "../../../buttons";
import { Form } from "react-final-form";
import { AppContext } from "../../../../views/components/AppContext";
import { useGetUserStory } from "../services/useGetUserStory";
import axios from "axios";

export const Details: React.FC<DetailsProps> = ({
  userStoryId,
  handleClose,
}) => {
  const appContext = useContext(AppContext);
  const UserStory = useGetUserStory(userStoryId);

  const handleValidate = (values: any) => {
    const errors: any = {};
    if (!values.StoryPoints) {
      errors.StoryPoint = "Story Points Required";
    }
    if (!values.Title) {
      errors.CardTitle = "Title Required";
    }
    return errors;
  };

  const submitForm = (values: any) => {
    const toSubmit = {
      ...values,
      id: UserStory.id,
      UserStoryId: UserStory.userStoryId,
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
              title: values.Title,
              storyPoints: values.StoryPoints,
              description: values.Description,
              acceptanceCriteria: values.AcceptanceCriteria,
              archived: UserStory.archived,
            },
          });
        }
      })
      .catch((err) => console.log(err.response));
  };

  const handleArchive = () => {
    axios
      .delete(`/UserStory/${userStoryId}`)
      .then((response) => {
        if (response.status === 202) {
          appContext.UserStoriesDispatcher({
            type: "DELETE_USER_STORY",
            StoryId: UserStory.id,
          });
        }
        appContext.ColumnsDispatcher({
          type: "ARCHIVE_CARD",
          CardId: userStoryId,
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <DialogContent>
      <Form
        onSubmit={submitForm}
        initialValues={{
          Title: UserStory.title,
          Description: UserStory.description,
          AcceptanceCriteria: UserStory.acceptanceCriteria,
          StoryPoints: UserStory.storyPoints,
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
              <CardTitle>{UserStory.title}</CardTitle>
            </Box>
            <Box className={styles.menuBar}>
              <StoryPoints>{UserStory.storyPoints || ""}</StoryPoints>
            </Box>
            <Box className={styles.body}>
              <Box className={styles.leftColumn}>
                <CardDescription>{UserStory.description || ""}</CardDescription>
                <AcceptanceCriteria>
                  {UserStory.acceptanceCriteria || ""}
                </AcceptanceCriteria>
              </Box>
              <Box className={styles.rightColumn}></Box>
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
