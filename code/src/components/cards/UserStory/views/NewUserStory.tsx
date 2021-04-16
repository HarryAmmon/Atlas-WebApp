import axios from "axios";
import React, { useContext } from "react";
import { Form } from "react-final-form";
import { BaseCard } from "../..";
import { BoardContext } from "../../../boards/services/BoardContext";

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
  const boardContext = useContext(BoardContext);
  if (display) {
    return (
      <BaseCard variant="UserStory">
        <Form
          onSubmit={(values: any) => {
            console.log(values);
            axios
              .post("/UserStory", {
                ...values,
                TasksId: [],
                BugsId: [],
              })
              .then((response) => {
                boardContext.KanBanColumnDispatcher({
                  type: "ADD_CARD",
                  userStoryId: response.data.id,
                });
                setDisplay(false);
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
