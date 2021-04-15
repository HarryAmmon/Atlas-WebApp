import React from "react";

export interface DetailsProps {
  showDetails: boolean;
  handleClose: () => void;
  id: TaskId;
}

export interface CheckboxWithTask {
  id: TaskId;
}

export interface SummaryProps {
  id: TaskId;
}

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
      id: TaskId;
      completed: boolean;
    }
  | { type: "ADD_TASK"; Task: TaskFields }
  | { type: "UPDATE_TASK"; Task: TaskFields }
  | { type: "ADD_EXISTING_TASKS"; Tasks: TaskFields[] };

export type TaskId = string;

export interface TaskContextProps {
  Task: TaskFields;
  TaskDispatcher: React.Dispatch<TaskActions>;
}
