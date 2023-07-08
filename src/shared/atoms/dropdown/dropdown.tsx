import React, { useCallback, useRef, useState } from 'react';

import { DropdownConfigType, DropdownOptionType } from './types';
import useOutsideClick from '@algospace/shared/hooks/use-outside-click';

interface DropDownProps {
  className?: string;
  config: DropdownConfigType;
  triggerNode?: React.ReactNode;
  isTriggerNodeEnabled?: boolean;
}

export const DropDown = ({ className, config, triggerNode, isTriggerNodeEnabled = true }: DropDownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(!isTriggerNodeEnabled);
  const [currentConfig, setCurrentConfig] = useState(config);
  const [configHistory, setConfigHistory] = useState<DropdownConfigType[]>([]);

  useOutsideClick([dropdownRef], () => {
    setIsOpen(false);
  });

  const handleOptionClick = (event: React.MouseEvent, option: DropdownOptionType) => {
    event.stopPropagation();
    if (option.subOptions) {
      setConfigHistory((prevConfigHistory) => [...prevConfigHistory, currentConfig]);
      setCurrentConfig({
        footer: option.subOptions.footer,
        header: { enableBackNavigation: true },
        options: option.subOptions.options,
      });
    }
  };

  const handleBackNavigation = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setConfigHistory((prevConfigHistory) => {
      if (prevConfigHistory.length > 0) {
        const newConfigHistory = [...prevConfigHistory];
        const previousConfig = newConfigHistory.pop();
        previousConfig && setCurrentConfig(previousConfig);
        return newConfigHistory;
      }
      return prevConfigHistory;
    });
  }, []);

  const renderDropdownContent = (config: DropdownConfigType | undefined) => {
    if (!config) return null;

    return (
      <div ref={dropdownRef} className="bg-dropdown min-w-80 w-fit border border-default rounded-md">
        {config.header && (
          <div className="bg-dropdown border-b border-default px-4 py-2.5 text-primary text-small">
            {config.header.enableBackNavigation && (
              <button className="dropdown-back-button" onClick={(event) => handleBackNavigation(event)}>
                Back
              </button>
            )}
            {config.header.renderer ? config.header.renderer : config.header.title}
            {config.header.rightContainer && (
              <div className="dropdown-header-right">{config.header.rightContainer}</div>
            )}
          </div>
        )}

        <div className="px-1 py-1.5">
          {currentConfig.options?.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-dropdown-hover px-3 py-1.5"
              onClick={(event) => handleOptionClick(event, option)}
            >
              {option.renderer ? option.renderer : option.label}
              {option.leftContainer && <div className="dropdown-option-left">{option.leftContainer}</div>}
              {option.rightContainer && <div className="dropdown-option-right">{option.rightContainer}</div>}
            </div>
          ))}
        </div>

        {config.footer && (
          <div className="bg-dropdown border-t border-default px-4 py-2.5 text-primary text-small">
            {config.footer.renderer ? config.footer.renderer : config.footer.title}
            {config.footer.leftContainer && <div className="dropdown-footer-left">{config.footer.leftContainer}</div>}
            {config.footer.rightContainer && (
              <div className="dropdown-footer-right">{config.footer.rightContainer}</div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div onClick={() => setIsOpen(true)}>
      {isTriggerNodeEnabled && triggerNode}
      {isOpen && renderDropdownContent(currentConfig)}
    </div>
  );
};
