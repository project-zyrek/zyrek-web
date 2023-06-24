'use client';
import { DropDown } from '@algospace/shared/atoms/dropdown';
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
      <DropDown config={dummyConfig} triggerNode={<button>Open Dropdown</button>} />
    </div>
  );
}
