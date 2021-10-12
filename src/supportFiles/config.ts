import { getScreenWidth } from "./helper";
import { BubbleSort } from "../sortingAlgorithms/BubbleSort";
import { SelectionSort } from "../sortingAlgorithms/SelectionSort";
import { InsertionSort } from "../sortingAlgorithms/InsertionSort";
import { QuickSort } from "../sortingAlgorithms/QuickSort";
import { HeapSort } from "../sortingAlgorithms/HeapSort";
import { MergeSort } from "../sortingAlgorithms/MergeSort";

// colors setting
export const comparisionColor = "#99CCFF";
export const swapColor = "#FFFF66";
export const sortedColor = "#99FF99";
export const pivotColor = "#FF6666";

// time setting
export let swapTime = 1000;
export let compareTime = 500;

// init array
export let sortingArray = () => {
  const screenSize = getScreenWidth();
  if (screenSize < 460) return [];
  return [];
};

export const sortingAlgorithms = [
  { component: QuickSort, title: "Quick", name: "QuickSort" },
  { component: InsertionSort, title: "Insertion", name: "InsertionSort" },
  { component: SelectionSort, title: "Selection", name: "SelectionSort" },
  { component: BubbleSort, title: "Bubble", name: "BubbleSort" },
  { component: MergeSort, title: "Merge", name: "MergeSort" },
  { component: HeapSort, title: "Heap", name: "HeapSort" },
];
