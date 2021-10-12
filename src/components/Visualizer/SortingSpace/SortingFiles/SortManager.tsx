/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrayContainer } from "./ArrayContainer";
import { MergeContainer } from "./MergeContainer";
import { InfoFooter } from "./InfoFooter";
import { Timer } from "./Timer";
import Card from "@material-ui/core/Card";
import { delay } from "../../../../supportFiles/helper";
import shallow from "zustand/shallow";
import { useControls, useData } from "../../../../supportFiles/store";

let compareTime = useControls.getState().compareTime;
let swapTime = useControls.getState().swapTime;

useControls.subscribe(
  ([cTime, sTime]:any) => {
    compareTime = cTime;
    swapTime = sTime;
  },
  (state:any) => [state.compareTime, state.swapTime],
  shallow
);

const Container:any = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`;

const AlgoHeaderBar:any = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`;

const TimerDiv:any = styled.div`
  display: flex;
  column-gap: 5px;
  min-width: 8rem;
  justify-content: flex-end;
`;

export const SortManager = React.memo(function ({
  array,
  sortFunction,
  sortingAlgorithmName,
}:any) {
  const [swapIndices, setSwapIndices] = useState([-1, -1]);
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1]);

  const algoArray:any = useRef([]);
  const sortedIndices:any = useRef([]);
  const pivot:any = useRef(-1);
  const swapCount:any = useRef(0);
  const comparisionCount:any = useRef(0);
  const isAlgoExecutionOver:any = useRef(false);
  const isComponentUnMounted:any = useRef(false);

  const markSortngDone:any = useControls((state:any) => state.markSortngDone);
  const progress:any = useRef("");
  const sortProgressIterator:any = useRef(null);

  async function reset() {
    algoArray.current = [...useData.getState().sortingArray];
    sortedIndices.current = [];
    pivot.current = -1;
    swapCount.current = 0;
    comparisionCount.current = 0;
    isAlgoExecutionOver.current = false;
    setSwapIndices([-1, -1]);
    setHightlightedIndices([-1, -1]);

    sortProgressIterator.current =
      sortingAlgorithmName === "MergeSort"
        ? await sortFunction(algoArray.current, combine, highlight, markSort)
        : await sortFunction(algoArray.current, swap, highlight, markSort);
  }

  useEffect(() => {
    progress.current = useControls.getState().progress;
    useControls.subscribe(
      (value:any) => {
        progress.current = value;

        if (progress.current === "start") runAlgo();
        if (progress.current === "reset") reset();
      },
      (state:any) => state.progress
    );

    return () => {
      isComponentUnMounted.current = true;
    };
  }, []);

  useEffect(() => {
    reset();
  }, [array]);

  async function runAlgo() {
    let completion = { done: false };
    while (
      !completion?.done &&
      progress.current === "start" &&
      !isComponentUnMounted.current
    ) {
      completion = await sortProgressIterator.current?.next();
    }

    if (isComponentUnMounted.current) {
      return;
    }

    if (!isAlgoExecutionOver.current && completion?.done) {
      isAlgoExecutionOver.current = true;
      pivot.current = -1;
      setSwapIndices([-1, -1]);
      setHightlightedIndices([-1, -1]);
      markSortngDone();
    }
  }

  async function swap(i:any, j:any) {
    let tmp = algoArray.current[i];
    algoArray.current[i] = algoArray.current[j];
    algoArray.current[j] = tmp;
    setSwapIndices([i, j]);

    pivot.current = -1;
    swapCount.current += 1;
    await delay(swapTime);
  }

  async function combine(source:any, destination:any) {
    if (source !== destination) {
      swapCount.current += 1;
      setHightlightedIndices([-1, -1]);
      setSwapIndices([source, destination]);
      await delay(swapTime);
    }
  }

  async function highlight(indices:any, p:any) {
    setSwapIndices([-1, -1]);
    comparisionCount.current += 1;
    pivot.current = p;
    setHightlightedIndices(indices);
    await delay(compareTime);
  }

  function markSort(...indices:any) {
    sortedIndices.current.push(...indices);
  }

  const mergeContainer = (
    <MergeContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      hightlightedIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  );
  const arrayContainer = (
    <ArrayContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      pivot={pivot.current}
      highlightIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  );

  return (
    <Container style={{ backgroundColor: "gainsboro", margin: "0 !important" }}>
      <AlgoHeaderBar>
        <strong>{sortingAlgorithmName}</strong>
        <TimerDiv>
          <span>Time:</span>
          <strong>
            <Timer isAlgoExecutionOver={isAlgoExecutionOver.current} />
          </strong>
        </TimerDiv>
      </AlgoHeaderBar>
      {sortingAlgorithmName === "MergeSort" ? mergeContainer : arrayContainer}
      <InfoFooter
        swapCount={swapCount.current}
        comparisionCount={comparisionCount.current}
      ></InfoFooter>
    </Container>
  );
});
