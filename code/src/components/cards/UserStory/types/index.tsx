export interface UserStoryProps {
  UserStory :UserStoryFields;
  Mode :"summary" | "detail";
}

export interface UserStoryFields {
  id: string;
  title: string;
  description?: string;
  acceptanceCriteria?: string;
  storyPoints?: string;
}

export interface ViewProps {
  changeView?: () => void;
}
