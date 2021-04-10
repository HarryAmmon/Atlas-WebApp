export interface DetailsProps {
  id: TaskId;
  showDetails: boolean;
  handleClose: () => void;
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

export type TaskId = string;
