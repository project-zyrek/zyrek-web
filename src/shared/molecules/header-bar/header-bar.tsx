import { FRACTION_ENUM } from '@algospace/utils/fraction';
import React, { ReactNode } from 'react';

interface HeaderBarProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  config: {
    content: ReactNode;
    verticalSpace?: FRACTION_ENUM;
  }[];
  separator?: boolean;
}

export const HeaderBar = ({ left, right, config, separator = true }: HeaderBarProps) => {
  return (
    <header className="flex">
      {left && <div className="left">{left}</div>}
      {config.map((item, index, array) => (
        <div key={index} className={`flex-${item.verticalSpace || '1/1'} w-full`}>
          {item.content}
          {separator && index < array.length - 1 && <div className="separator" />}
        </div>
      ))}
      {right && <div className="right">{right}</div>}
    </header>
  );
};
