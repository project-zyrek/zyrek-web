import { makeDelay } from '@algospace/utils';
import { ACTION_COLOR, DEFAULT_COLOR } from './constants';
import { ComparisonType } from '@algospace/types';

export const ACTION = {
  Selection: async (itemIndex: number, sortingContainerRef: React.RefObject<HTMLDivElement>) => {
    const item = sortingContainerRef.current?.children[itemIndex] as HTMLDivElement;
    item.style.backgroundColor = ACTION_COLOR.Selection;
    item.style.backgroundColor = DEFAULT_COLOR;
  },
  Comparison: async (
    item_1Index: number,
    item_2Index: number,
    sortingContainerRef: React.RefObject<HTMLDivElement>,
    comparisonType: ComparisonType,
    actionFunction: () => void,
    delay: number,
  ) => {
    const item_1 = sortingContainerRef.current?.children[item_1Index] as HTMLDivElement;
    const item_2 = sortingContainerRef.current?.children[item_2Index] as HTMLDivElement;

    const item_1Height = item_1.style.height;
    const item_2Height = item_2.style.height;

    item_1.style.backgroundColor = ACTION_COLOR.Comparison_1;
    item_2.style.backgroundColor = ACTION_COLOR.Comparison_1;

    await makeDelay(delay / 2);

    if (comparisonType === ComparisonType.LessThan) {
      if (item_1Height < item_2Height) {
        actionFunction();
      }
    } else if (comparisonType === ComparisonType.GreaterThan) {
      if (item_1Height > item_2Height) {
        console.log('here');
        actionFunction();
      }
    } else if (comparisonType === ComparisonType.Equal) {
      if (item_1Height === item_2Height) {
        actionFunction();
      }
    }

    await makeDelay(delay / 2);

    item_1.style.backgroundColor = DEFAULT_COLOR;
    item_2.style.backgroundColor = DEFAULT_COLOR;
  },
  Swapping: async (item_1Index: number, item_2Index: number, sortingContainerRef: React.RefObject<HTMLDivElement>) => {
    const item_1 = sortingContainerRef.current?.children[item_1Index] as HTMLDivElement;
    const item_2 = sortingContainerRef.current?.children[item_2Index] as HTMLDivElement;
    item_1.style.backgroundColor = ACTION_COLOR.Swapping;
    item_2.style.backgroundColor = ACTION_COLOR.Swapping;

    // swap the heights of the elements in the UI
    const temp = item_1.style.height;
    item_1.style.height = item_2.style.height;
    item_2.style.height = temp;
  },
  ResetColor: async (
    item_1Index: number,
    item_2Index: number,
    sortingContainerRef: React.RefObject<HTMLDivElement>,
  ) => {
    const item_1 = sortingContainerRef.current?.children[item_1Index] as HTMLDivElement;
    const item_2 = sortingContainerRef.current?.children[item_2Index] as HTMLDivElement;
    item_1.style.backgroundColor = DEFAULT_COLOR;
    item_2.style.backgroundColor = DEFAULT_COLOR;
  },
};

export const BubbleSort = async (sortingContainerRef: React.RefObject<HTMLDivElement>, duration: number) => {
  const length = sortingContainerRef.current?.children.length as number;

  for (let firstElement = 0; firstElement < length - 1; firstElement++) {
    for (let secondElement = 0; secondElement < length - firstElement - 1; secondElement++) {
      await ACTION.Comparison(
        secondElement,
        secondElement + 1,
        sortingContainerRef,
        ComparisonType.GreaterThan,
        async () => {
          await ACTION.Swapping(secondElement, secondElement + 1, sortingContainerRef);
        },
        duration,
      );
    }
  }
};
