export interface UserStoryProps {
  title: string;
  description: string;
  id: string;
}

export interface SummaryProps {
  id: string;
  title: string;
  changeView?: () => void;
}

export interface DetailsProps {
  id: string;
  title: string;
  description: string;
  changeView?: () => void;
}
