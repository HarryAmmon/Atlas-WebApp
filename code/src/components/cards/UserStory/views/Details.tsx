import { Box, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Styles from "./Details.module.scss";
import { ViewProps } from "../types";
import {
  CardTitle,
  CardDescription,
  AcceptanceCriteria,
  StoryPoints,
} from "../../../forms";
import {
  SaveAndCloseButton,
  CloseButton,
  ArchiveButton,
} from "../../../buttons";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../views/components/AppContext";
import { useGetUserStory } from "../services/useGetUserStory";
import axios from "axios";

export const Details: React.FC<ViewProps> = ({ userStoryId }) => {
  const history = useHistory();
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
    console.log(errors);
    return errors;
  };

  const handleSubmit = (values: any) => {
    const toSubmit = {
      ...values,
      id: UserStory.id,
      storyId: UserStory.storyId,
    };
    console.log(toSubmit);
    axios
      .put(`https://localhost:5001/UserStory/${UserStory.id}`, toSubmit)
      .then((response) => {
        if (response.status === 204) {
          appContext.UserStoriesDispatcher({
            type: "UPDATE_USER_STORY",
            UserStory: {
              id: UserStory.id,
              storyId: userStoryId,
              title: values.Title,
              storyPoints: values.StoryPoints,
              description: values.Description,
              acceptanceCriteria: values.AcceptanceCriteria,
              archived: UserStory.archived,
            },
          });
          close();
        }
      })
      .catch((err) => console.log(err.response));
  };

  const close = () => {
    history.goBack();
  };

  return (
    <Form
      onSubmit={handleSubmit}
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
          <Box className={Styles.titleBar}>
            <Typography variant="h5" className={Styles.id}>
              {UserStory.storyId}
            </Typography>
            <CardTitle>{UserStory.title || ""}</CardTitle>
            {dirty ? <SaveAndCloseButton /> : <CloseButton onClick={close} />}
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
                    close();
                  })
                  .catch((err) => console.log(err.response));
              }}
            />
          </Box>
          <Box className={Styles.body}>
            <Box className={Styles.leftColumn}>
              <CardDescription>{UserStory.description || ""}</CardDescription>
              <AcceptanceCriteria>
                {UserStory.acceptanceCriteria || ""}
              </AcceptanceCriteria>
            </Box>
            <Box className={Styles.rightColumn}>
              <StoryPoints>{UserStory.storyPoints || ""}</StoryPoints>
            </Box>
          </Box>
        </form>
      )}
    </Form>
  );
};
