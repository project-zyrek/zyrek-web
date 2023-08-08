'use client';
import { DROPDOWN_TRIGGER_TYPE, DropDown } from '@algospace/components/atoms/dropdown';
import { SortingVisualizer } from '@algospace/components/visualizer';
import React from 'react';

export default function Home() {
  return (
    <div className="bg-base">
      <SortingVisualizer />
    </div>
  );
}
