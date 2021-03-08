import { Box, Paper, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import Styles from "./Details.module.scss";
import { ViewProps } from "../types";
import {
  CardTitle,
  CardDescription,
  AcceptanceCriteria,
  StoryPoints,
  SaveAndCloseButton,
  CloseButton,
} from "../../../forms";
import { Form } from "react-final-form";
import { UserStoryContext } from "../UserStoryContext";
import { useHistory } from "react-router-dom";

export const Details: React.FC<ViewProps> = ({ changeView }) => {
  const UserStory = useContext(UserStoryContext);
  const history = useHistory();

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
    console.log(UserStory.title);
    console.log(values);
    UserStory.title = "a submitted title";
    console.log(UserStory.title);
    close();
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
