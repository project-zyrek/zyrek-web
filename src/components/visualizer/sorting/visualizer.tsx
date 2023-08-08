import React, { useEffect, useRef, useState } from 'react';
import { GAP, MIN_BAR_COUNT, MIN_BAR_HEIGHT } from './constants';
import { Bar } from '@algospace/components/atoms/bar';

export const SortingVisualizer = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [barWidth, setBarWidth] = useState(0);
  const [barMaxHeight, setBarMaxHeight] = useState(0);
  const [barCount, setBarCount] = useState(MIN_BAR_COUNT);
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const [barCountSliderProps, setBarCountSliderProps] = useState({ min: 0, max: 0 });

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const containerHeight = containerRef.current?.clientHeight ?? 0;

    // Setting bar count slider props
    const maxBarCount = Math.floor(containerWidth / MIN_BAR_COUNT);
    setBarCountSliderProps({ min: MIN_BAR_COUNT, max: maxBarCount });

    // Setting bar width
    const barWidth = Math.floor((containerWidth - barCount * GAP) / barCount);
    setBarWidth(barWidth);

    // Setting bar maxHeight
    const barMaxHeight = containerHeight - GAP;
    setBarMaxHeight(barMaxHeight);

    // Generate random bar heights
    const barHeights = Array.from({ length: barCount }, () =>
      Math.floor(Math.random() * (barMaxHeight - MIN_BAR_HEIGHT) + MIN_BAR_HEIGHT),
    );
    setBarHeights(barHeights);

    console.log('barHeights', barHeights);
  }, [containerRef, containerRef.current?.clientWidth, containerRef.current?.clientHeight, barCount]);

  return (
    <div
      className="flex justify-center items-end w-full min-h-[600px] bg-slate-600"
      style={{ gap: `${GAP}px`, padding: `${GAP}px` }}
      ref={containerRef}
    >
      {barHeights.map((barHeight, index) => {
        return <Bar key={index} width={barWidth} height={barHeight} color="#232323" />;
      })}
    </div>
  );
};
