export interface BaseCardProps {
  className?: string;
  changeView?: () => void;
  variant: CardVariants;
}

export type CardVariants = "UserStory" | "Task" | "Bug";
