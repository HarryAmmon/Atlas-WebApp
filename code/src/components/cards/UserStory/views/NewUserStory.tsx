import axios from "axios";
import React, { useContext } from "react";
import { Form } from "react-final-form";
import { BaseCard } from "../..";
import { AppContext } from "../../../../views/components/AppContext";
import {
  SubmitOnBlurTextField,
  SubmitOnBlurTextFieldProps,
} from "../../../forms";

interface NewUserStoryProps extends SubmitOnBlurTextFieldProps {
  display: boolean;
  columnId: string;
}

export const NewUserStory: React.FC<NewUserStoryProps> = ({
  display,
  setDisplay,
  columnId,
  name,
}) => {
  const appContext = useContext(AppContext);
  if (display) {
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
              <SubmitOnBlurTextField setDisplay={setDisplay} name={name} />
            </form>
          )}
        </Form>
      </BaseCard>
    );
  } else {
    return <></>;
  }
};
