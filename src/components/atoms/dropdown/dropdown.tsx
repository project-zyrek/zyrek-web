import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { DropdownConfigType, DropdownHandles, DropdownOptionType } from './types';
import useOutsideClick from '@algospace/hooks/use-outside-click';
import clsx from 'clsx';
import { DROPDOWN_TRIGGER_TYPE } from './constants';

interface DropDownProps {
  className?: string;
  config: DropdownConfigType;
  triggerNode: React.ReactNode;
  triggerType?: DROPDOWN_TRIGGER_TYPE;
}

export const DropDown = forwardRef<DropdownHandles, DropDownProps>(
  ({ className, config, triggerNode, triggerType = DROPDOWN_TRIGGER_TYPE.CLICK }, ref) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [currentConfig, setCurrentConfig] = useState(config);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
    const [configHistory, setConfigHistory] = useState<DropdownConfigType[]>([]);

    useImperativeHandle(ref, () => ({
      isOpen,
    }));

    useOutsideClick([dropdownRef], () => {
      setIsOpen(false);
    });

    useEffect(() => {
      if (!isOpen || !dropdownRef.current || !triggerRef.current) return;

      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      let top, left;

      if (triggerRect.bottom + dropdownRect.height > window.innerHeight)
        top = scrollTop + triggerRect.top - dropdownRect.height;
      else top = scrollTop + triggerRect.bottom;

      if (triggerRect.left + dropdownRect.width > window.innerWidth)
        left = window.scrollX + triggerRect.right - dropdownRect.width;
      else left = triggerRect.left;

      setDropdownStyle({
        top: top + 'px',
        left: left + 'px',
        position: 'absolute',
      });
    }, [isOpen, currentConfig]);

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

    useEffect(() => {
      setCurrentConfig(config);
      setConfigHistory([]);
    }, [isOpen]);

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
        <div
          ref={dropdownRef}
          className={clsx('bg-dropdown min-w-80 w-fit border border-default rounded-md', className)}
          onMouseLeave={triggerType === DROPDOWN_TRIGGER_TYPE.HOVER ? () => setIsOpen(false) : undefined}
        >
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
      <>
        <div
          ref={triggerRef}
          onClick={triggerType === DROPDOWN_TRIGGER_TYPE.CLICK ? () => setIsOpen(!isOpen) : undefined}
          onMouseEnter={triggerType === DROPDOWN_TRIGGER_TYPE.HOVER ? () => setIsOpen(true) : undefined}
        >
          {triggerNode}
        </div>
        {isOpen && renderDropdownContent(currentConfig)}
      </>
    );
  },
);
