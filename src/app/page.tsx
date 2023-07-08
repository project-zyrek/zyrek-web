'use client';
import { DROPDOWN_TRIGGER_TYPE, DropDown } from '@algospace/shared/atoms/dropdown';
import React from 'react';

export default function Home() {
  const dummyConfig = {
    footer: {
      title: 'Footer',
    },
    header: {
      title: 'Main Menu',
    },
    options: [
      {
        label: 'Option 1',
        subOptions: {
          header: { enableBackNavigation: true, title: 'Sub Menu 1' },
          options: [
            { label: 'Sub Option 1.1' },
            { label: 'Sub Option 1.2' },
            {
              label: 'Sub Option 1.3',
              subOptions: {
                header: { enableBackNavigation: true, title: 'Sub Menu 1.3' },
                options: [{ label: 'Sub Option 1.3.1' }, { label: 'Sub Option 1.3.2' }],
              },
            },
          ],
        },
      },
      {
        label: 'Option 2',
        subOptions: {
          header: { enableBackNavigation: true, title: 'Sub Menu 2' },
          options: [{ label: 'Sub Option 2.1' }, { label: 'Sub Option 2.2' }],
        },
      },
      { label: 'Option 3' },
    ],
  };

  return (
    <div className="h-screen bg-base">
      <DropDown
        config={dummyConfig}
        triggerType={DROPDOWN_TRIGGER_TYPE.HOVER}
        triggerNode={<button className="text-default">Open Dropdown</button>}
      />
    </div>
  );
}
