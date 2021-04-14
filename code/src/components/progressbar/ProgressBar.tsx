import React from "react";

export interface ProgressBarProps {
  maxValue: number;
  value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  maxValue,
  value,
}) => {
  return <progress max={maxValue} value={value}></progress>;
};
