import React from "react";
import { BaseCard } from "../..";
import {
  SubmitOnBlurTextField,
  SubmitOnBlurTextFieldProps,
} from "../../../forms";

interface NewBugProps extends SubmitOnBlurTextFieldProps {
  display: boolean;
  storyId: string;
}

export const NewBug: React.FC<NewBugProps> = ({
  display,
  setDisplay,
  storyId,
  name,
}) => {
  if (display) {
    return (
      <BaseCard variant="Bug">
        <SubmitOnBlurTextField setDisplay={setDisplay} name={name} />
      </BaseCard>
    );
  } else {
    return <></>;
  }
};
