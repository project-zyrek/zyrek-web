import React from 'react';

import { SEPERATOR_TYPE_ENUM, SEPERATOR_VARIANT_ENUM } from './constants';

interface SeparatorProps {
  separatorStyle: SEPERATOR_TYPE_ENUM;
  variant: SEPERATOR_VARIANT_ENUM;
  className?: string;
}

export const Separator = ({ separatorStyle, variant, className = '' }: SeparatorProps) => {
  let separatorClass;
  const orientationClass = variant === SEPERATOR_VARIANT_ENUM.Horizontal ? 'w-full' : 'h-full';

  switch (separatorStyle) {
    case SEPERATOR_TYPE_ENUM.Solid:
      separatorClass = '!border';
      break;
    case SEPERATOR_TYPE_ENUM.Dashed:
      separatorClass = '!border-dashed';
      break;
    case SEPERATOR_TYPE_ENUM.Dotted:
      separatorClass = '!border-dotted';
      break;
    default:
      separatorClass = '!border';
  }

  return <div className={`border ${orientationClass} ${separatorClass} ${className}`}></div>;
};
