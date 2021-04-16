export interface SummaryProps {
  id: BugId;
}

export interface NewBugFields {
  id: BugId;
  title: string;
  completed: boolean;
}

export interface BugFields extends NewBugFields {
  description?: string;
  reproductionSteps?: string;
}

export type BugActions =
  | {
      type: "SET_COMPLETED";
      id: BugId;
      completed: boolean;
    }
  | {
      type: "ADD_BUG";
      Bug: BugFields;
    }
  | { type: "UPDATE_BUG"; Bug: BugFields }
  | {
      type: "ADD_EXISTING_BUGS";
      Bug: BugFields[];
    };

export interface BugProps {
  id: BugId;
  className?: string;
}

export type BugId = string;
