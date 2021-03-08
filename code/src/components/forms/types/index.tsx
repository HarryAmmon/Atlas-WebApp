export interface CardTitleInput {
  children: string;
}

export interface CardDescriptionInput {
  children: string;
}

export interface AcceptanceCriteriaInput {
  children: string;
}

export interface StoryPointsInput {
  children: string;
}

export interface Stylable {
  className?: string;
}

export interface SaveAndCloseButtonProps extends Stylable {
  onClick?: () => void;
}

export interface CloseButtonProps extends Stylable {
  onClick?: () => void;
}
