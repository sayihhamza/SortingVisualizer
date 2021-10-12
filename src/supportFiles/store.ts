import create from "zustand";
import { devtools } from "zustand/middleware";
import {
  sortingArray,
  compareTime,
  swapTime,
  sortingAlgorithms,
} from "./config";

export const useData:any = create(
  devtools((set) => ({
    algorithm: 0,
    sortingArray: sortingArray,
    setSortingArray: (array:any) => set({ sortingArray: array }),
    setAlgorithm: (idx:any) => set({ algorithm: idx }),
  }))
);

export const useControls:any = create(
  devtools((set) => ({
    progress: "reset",
    speed: 3,
    compareTime: compareTime,
    swapTime: swapTime,
    doneCount: 0,
    startSorting: () => set({ progress: "start" }),
    pauseSorting: () => set({ progress: "pause" }),
    resetSorting: () => set({ progress: "reset", doneCount: 0 }),
    markSortngDone: () =>
      set((state:any) => {
        if (useData.getState().algorithm === sortingAlgorithms.length) {
          if (state.doneCount === sortingAlgorithms.length - 1)
            return { doneCount: 0, progress: "done" };
          else return { doneCount: state.doneCount + 1 };
        } else return { progress: "done" };
      }),
    setSpeed: (speed:any) =>
      set(() => {
        return { swapTime: 3000 / speed, compareTime: 1500 / speed, speed };
      }),
  }))
);
