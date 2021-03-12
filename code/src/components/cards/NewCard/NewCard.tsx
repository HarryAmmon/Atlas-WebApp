import { TextField } from "mui-rff";
import React, { useContext } from "react";
import { Form, useForm } from "react-final-form";
import { AppContext } from "../../../views/components/AppContext";
import { BaseCard } from "../UserStory/views/BaseCard";
import styles from "./NewCard.module.scss";

interface SubmitOnBlurTextFieldProps {
  setDisplay: (value: boolean) => void;
}

interface NewCardProps extends SubmitOnBlurTextFieldProps {
  type: "UserStory";
  display: boolean;
}

export const NewCard: React.FC<NewCardProps> = ({
  type,
  display,
  setDisplay,
}) => {
  const appContext = useContext(AppContext);
  if (display) {
    switch (type) {
      case "UserStory":
        return (
          <BaseCard>
            <Form
              onSubmit={(values: any) =>
                appContext.UserStoriesDispatcher({
                  type: "ADD_USER_STORY",
                  UserStory: { title: values.CardTitle },
                })
              }
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <SubmitOnBlurTextField setDisplay={setDisplay} />
                </form>
              )}
            </Form>
          </BaseCard>
        );
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
      name="CardTitle"
      onBlur={(event: any) => {
        console.log(event.target.value);
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
