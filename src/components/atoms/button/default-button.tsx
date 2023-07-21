import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface ButtonProps {
  content: ReactNode;
  className?: string;
  isDisabled?: boolean;
}

export const Button = ({ content, className, isDisabled }: ButtonProps) => {
  return (
    <button className={clsx('flex justify-center items-center', className)} disabled={isDisabled}>
      {content}
    </button>
  );
};
