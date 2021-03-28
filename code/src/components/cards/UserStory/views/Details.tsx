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
  showDetails,
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
    console.log("calling submit form");
    const toSubmit = {
      ...values,
      id: UserStory.id,
      UserStoryId: UserStory.userStoryId,
    };

    axios
      .put(
        `https://ci601-api.azurewebsites.net/UserStory/${UserStory.id}`,
        toSubmit
      )
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
        {({ handleSubmit, dirty }) => (
          <form onSubmit={handleSubmit}>
            <Box className={styles.titleBar}>
              <Typography variant="h5" className={styles.id}>
                {UserStory.userStoryId}
              </Typography>
              <CardTitle>{UserStory.title || ""}</CardTitle>
            </Box>
            <Box>
              <ArchiveButton
                onClick={() => {
                  axios
                    .delete(`https://localhost:5001/UserStory/${UserStory.id}`)
                    .then((response) => {
                      if (response.status === 202) {
                        appContext.UserStoriesDispatcher({
                          type: "DELETE_USER_STORY",
                          StoryId: UserStory.id ? UserStory.id : "1",
                        });
                      }
                    })
                    .catch((err) => console.log(err.response));
                }}
              />
            </Box>
            <Box className={styles.body}>
              <Box className={styles.leftColumn}>
                <CardDescription>{UserStory.description || ""}</CardDescription>
                <AcceptanceCriteria>
                  {UserStory.acceptanceCriteria || ""}
                </AcceptanceCriteria>
              </Box>
              <Box className={styles.rightColumn}>
                <StoryPoints>{UserStory.storyPoints || ""}</StoryPoints>
              </Box>
            </Box>
            <DialogActions>
              <Button
                type="button"
                onClick={() => handleClose()}
                variant="text"
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Form>
    </DialogContent>
  );
};
