import { Box, Paper, Typography } from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, { useContext } from "react";
import Styles from "./Details.module.scss";
import { ViewProps } from "../types";
import {
  CardTitle,
  CardDescription,
  AcceptanceCriteria,
  StoryPoints,
} from "../../../forms";
import { Form } from "react-final-form";
import { UserStoryContext } from "../UserStoryContext";

const handleValidate = (values: any) => {
  const errors: any = {};
  if (!values.StoryPoint) {
    errors.StoryPoint = "Story Points Required";
  }
  if (!values.CardTitle) {
    errors.CardTitle = "Title Required";
  }
  return errors;
};

export const Details: React.FC<ViewProps> = ({ changeView }) => {
  const UserStory = useContext(UserStoryContext);
  return (
    <Paper className={Styles.root}>
      <Save />
      <Form
        onSubmit={() => console.log("Submitting form")}
        initialValues={{
          CardTitle: UserStory.title,
          Description: UserStory.description,
          AcceptanceCriteria: UserStory.acceptanceCriteria,
          StoryPoint: UserStory.storyPoints,
        }}
        validateOnBlur
        validate={handleValidate}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box className={Styles.titleBar}>
              <Typography variant="h5" className={Styles.id}>
                {UserStory.id}
              </Typography>
              <CardTitle>{UserStory.title}</CardTitle>
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
