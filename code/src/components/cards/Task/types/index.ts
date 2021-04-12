import React from "react";

export interface DetailsProps {
  showDetails: boolean;
  handleClose: () => void;
}

export interface CheckboxWithTask {
  id: TaskId;
}

export interface SummaryProps {}

export interface NewTaskFields {
  id: TaskId;
  title: string;
  completed: boolean;
}

export interface TaskFields extends NewTaskFields {
  description?: string;
}

export interface TaskProps {
  id: TaskId;
  className?: string;
}

export type TaskActions =
  | {
      type: "SET_COMPLETED";
      completed: boolean;
    }
  | { type: "ADD_TASK"; Task: TaskFields }
  | { type: "UPDATE_TASK"; Task: TaskFields };

export type TaskId = string;

export interface TaskContextProps {
  Task: TaskFields;
  TaskDispatcher: React.Dispatch<TaskActions>;
}
