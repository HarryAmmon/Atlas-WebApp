import axios from "axios";
import { TextField } from "mui-rff";
import React, { useContext } from "react";
import { Form, useForm } from "react-final-form";
import { BaseCard } from "..";
import { AppContext } from "../../../views/components/AppContext";
import { CardVariants } from "../BaseCard/types";
import styles from "./NewCard.module.scss";

interface SubmitOnBlurTextFieldProps {
  setDisplay: (value: boolean) => void;
}

interface NewCardProps extends SubmitOnBlurTextFieldProps {
  type: CardVariants;
  display: boolean;
  columnId: string;
}

export const NewCard: React.FC<NewCardProps> = ({
  type,
  display,
  setDisplay,
  columnId,
}) => {
  const appContext = useContext(AppContext);
  if (display) {
    switch (type) {
      case "UserStory":
        return (
          <BaseCard variant="UserStory">
            <Form
              onSubmit={(values: any) => {
                axios
                  .post("/UserStory", {
                    ...values,
                  })
                  .then((response) => {
                    appContext.UserStoriesDispatcher({
                      type: "ADD_NEW_USER_STORY",
                      UserStory: response.data,
                    });

                    appContext.ColumnsDispatcher({
                      type: "ADD_NEW_CARD",
                      ColumnId: columnId,
                      Card: response.data,
                    });
                  })
                  .catch((err) => console.warn(err.response));
              }}
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <SubmitOnBlurTextField setDisplay={setDisplay} />
                </form>
              )}
            </Form>
          </BaseCard>
        );
      case "Task":
        return <BaseCard variant="Task"></BaseCard>;
      default:
        return <></>;
    }
  } else {
    return <></>;
  }
};

const SubmitOnBlurTextField: React.FC<SubmitOnBlurTextFieldProps> = ({
  setDisplay,
}) => {
  const form = useForm();
  return (
    <TextField
      className={styles.root}
      name="title"
      onBlur={(event: any) => {
        if (event.target.value === "") {
          setDisplay(false);
        } else {
          form.submit();
        }
      }}
      autoFocus
    />
  );
};
