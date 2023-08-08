import clsx from 'clsx';
import React from 'react';

interface BarProps {
  height: number;
  width: number;
  color: string;
}

export const Bar = ({ height, width, color = '#343434' }: BarProps) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
      }}
    ></div>
  );
};
