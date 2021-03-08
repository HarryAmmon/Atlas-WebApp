import { Box, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Styles from "./Details.module.scss";
import { ViewProps } from "../types";
import {
  CardTitle,
  CardDescription,
  AcceptanceCriteria,
  StoryPoints,
} from "../../../forms";
import { SaveAndCloseButton, CloseButton } from "../../../buttons";
import { Form } from "react-final-form";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../../views/components/AppContext";
import { useGetUserStory } from "../services/useGetUserStory";

export const Details: React.FC<ViewProps> = ({ UserStoryId }) => {
  const history = useHistory();
  const appContext = useContext(AppContext);
  const UserStory = useGetUserStory(UserStoryId);

  const handleValidate = (values: any) => {
    console.log("handle validate called");
    const errors: any = {};
    if (!values.StoryPoint) {
      errors.StoryPoint = "Story Points Required";
    }
    if (!values.CardTitle) {
      errors.CardTitle = "Title Required";
    }
    return errors;
  };

  const handleSubmit = (values: any) => {
    console.log("handle submit called");
    console.log(values);

    appContext.UserStoriesDispatcher({
      type: "UPDATE_USER_STORY",
      UserStory: { id: "2", title: values.CardTitle },
    });

    // close();
  };

  const close = () => {
    history.goBack();
  };

  return (
    <Paper className={Styles.root}>
      <Form
        onSubmit={handleSubmit}
        initialValues={{
          CardTitle: UserStory.title,
          Description: UserStory.description,
          AcceptanceCriteria: UserStory.acceptanceCriteria,
          StoryPoint: UserStory.storyPoints,
        }}
        validateOnBlur
        validate={handleValidate}
      >
        {({ handleSubmit, dirty }) => (
          <form onSubmit={handleSubmit}>
            <Box className={Styles.titleBar}>
              <Typography variant="h5" className={Styles.id}>
                {UserStory.id}
              </Typography>
              <CardTitle>{UserStory.title}</CardTitle>
              {dirty ? <SaveAndCloseButton /> : <CloseButton onClick={close} />}
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
    </Paper>
  );
};
