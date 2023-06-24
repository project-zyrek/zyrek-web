import { ReactNode } from 'react';

export interface DropdownHeaderType {
  title?: string;
  renderer?: ReactNode;
  enableBackNavigation?: boolean;
  rightContainer?: ReactNode;
}

export interface DropdownFooterType {
  title?: string;
  renderer?: ReactNode;
  leftContainer?: ReactNode;
  rightContainer?: ReactNode;
}

export interface DropdownOptionType {
  label?: string;
  renderer?: ReactNode;
  leftContainer?: ReactNode;
  rightContainer?: ReactNode;
  subOptions?: DropdownConfigType;
}

export interface DropdownConfigType {
  header?: DropdownHeaderType;
  options?: DropdownOptionType[];
  footer?: DropdownFooterType;
}
