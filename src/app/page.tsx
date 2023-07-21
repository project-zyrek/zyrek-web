'use client';
import { DROPDOWN_TRIGGER_TYPE, DropDown } from '@algospace/components/atoms/dropdown';
import { SortingVisualizer } from '@algospace/components/visualizer';
import React from 'react';

export default function Home() {
  return (
    <div className="h-screen bg-base">
      <SortingVisualizer values={[10, 20, 30, 40, 50, 60, 70]} />
    </div>
  );
}
