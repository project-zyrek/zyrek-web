import { makeDelay } from '@algospace/utils';
import { ACTION_COLOR, DEFAULT_COLOR } from './constants';

export const ACTION = {
  Selection: async (itemIndex: number, sortingContainerRef: React.RefObject<HTMLDivElement>, duration: number) => {
    const item = sortingContainerRef.current?.children[itemIndex] as HTMLDivElement;
    item.style.backgroundColor = ACTION_COLOR.Selection;
    await makeDelay(duration);
    item.style.backgroundColor = DEFAULT_COLOR;
  },
  Comparison: async (
    item_1Index: number,
    item_2Index: number,
    sortingContainerRef: React.RefObject<HTMLDivElement>,
  ) => {
    const item_1 = sortingContainerRef.current?.children[item_1Index] as HTMLDivElement;
    const item_2 = sortingContainerRef.current?.children[item_2Index] as HTMLDivElement;
    item_1.style.backgroundColor = ACTION_COLOR.Comparison_1;
    item_2.style.backgroundColor = ACTION_COLOR.Comparison_2;
  },
  Swapping: async (item_1Index: number, item_2Index: number, sortingContainerRef: React.RefObject<HTMLDivElement>) => {
    const item_1 = sortingContainerRef.current?.children[item_1Index] as HTMLDivElement;
    const item_2 = sortingContainerRef.current?.children[item_2Index] as HTMLDivElement;
    item_1.style.backgroundColor = ACTION_COLOR.Swapping;
    item_2.style.backgroundColor = ACTION_COLOR.Swapping;

    const temp = item_1.style.height;
    item_1.style.height = item_2.style.height;
    item_2.style.height = temp;

    await makeDelay(1000);
    item_1.style.backgroundColor = DEFAULT_COLOR;
    item_2.style.backgroundColor = DEFAULT_COLOR;
  },
};
