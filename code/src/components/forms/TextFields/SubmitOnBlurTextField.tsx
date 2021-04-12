import { TextField } from "mui-rff";
import React from "react";
import { useForm } from "react-final-form";
import styles from "./SubmitOnBlurTextField.module.scss";

export interface SubmitOnBlurTextFieldProps {
  setDisplay: (value: boolean) => void;
  name: string;
}

export const SubmitOnBlurTextField: React.FC<SubmitOnBlurTextFieldProps> = ({
  setDisplay,
  name,
}) => {
  const form = useForm();
  return (
    <TextField
      className={styles.root}
      name={name}
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
