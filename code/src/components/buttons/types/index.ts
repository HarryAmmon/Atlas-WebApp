export interface Stylable {
  className?: string;
}

export interface SaveAndCloseButtonProps extends Stylable {
  onClick?: () => void;
}

export interface CloseButtonProps extends Stylable {
  onClick?: () => void;
}

export interface AddButtonProps extends Stylable {
  onClick?: () => void;
  label?: string;
}
