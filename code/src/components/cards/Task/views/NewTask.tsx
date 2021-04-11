import React from "react";
import { BaseCard } from "../..";
import {
  SubmitOnBlurTextField,
  SubmitOnBlurTextFieldProps,
} from "../../../forms";

interface NewTaskProps extends SubmitOnBlurTextFieldProps {
  display: boolean;
  storyId: string;
}

export const NewTask: React.FC<NewTaskProps> = ({
  display,
  setDisplay,
  storyId,
  name,
}) => {
  if (display) {
    return (
      <BaseCard variant="Task">
        <SubmitOnBlurTextField setDisplay={setDisplay} name={name} />
      </BaseCard>
    );
  } else {
    return <></>;
  }
};
