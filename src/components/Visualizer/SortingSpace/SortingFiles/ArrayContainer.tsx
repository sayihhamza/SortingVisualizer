import React from "react";
import styled from "styled-components";
import {
  comparisionColor,
  swapColor,
  sortedColor,
  pivotColor,
} from "../../../../supportFiles/config";
import { useControls } from "../../../../supportFiles/store";

import {
  ArrayHolder,
  ArrayItem,
  sourceAnimation,
  destinationAnimation,
} from "../../../../supportFiles/styles";

let swapTime:any = useControls.getState().swapTime;
useControls.subscribe(
  (time:any) => (swapTime = time),
  (state:any) => state.swapTime
);

const Source:any = styled(ArrayItem)`
  animation: ${(props:any) => destinationAnimation(props.distance, swapColor)}
    ${() => swapTime / 1000}s forwards;
`;

const Destination:any = styled(ArrayItem)`
  animation: ${(props:any) => sourceAnimation(props.distance, swapColor)}
    ${() => swapTime / 1000}s forwards;
`;

export function ArrayContainer({
  array,
  source,
  destination,
  pivot = -1,
  highlightIndices,
  sortedIndices,
}:any) {
  function getBackgroundColor(i:any) {
    if (i === pivot) {
      return pivotColor;
    }

    if (highlightIndices.includes(i)) {
      return comparisionColor;
    }

    if (sortedIndices.includes(i)) {
      return sortedColor;
    }
    return "";
  }

  return (
    <ArrayHolder>
      {array.map((value:any, i:any) => {
        if (i === source) {
          return (
            <Source
              key={i + ":" + source + ":" + destination + ":" + value}
              distance={destination - source}
              style={{
                order: destination,
                backgroundColor: getBackgroundColor(i),
                fontSize: "1.5em",
                height: "10vh",
              }}
            >
              <strong>{value}</strong>
            </Source>
          );
        }
        if (i === destination) {
          return (
            <Destination
              key={i + ":" + destination + ":" + source + ":" + value}
              distance={destination - source}
              style={{
                order: source,
                backgroundColor: getBackgroundColor(i),
                fontSize: "1.5em",
                height: "10vh",
              }}
            >
              <strong>{value}</strong>
            </Destination>
          );
        }
        return (
          <ArrayItem
            key={i + ":" + destination + ":" + source + ":" + value}
            style={{
              order: i,
              backgroundColor: getBackgroundColor(i),
              fontSize: "1.5em",
              height: "10vh",
            }}
          >
            <strong>{value}</strong>
          </ArrayItem>
        );
      })}
    </ArrayHolder>
  );
}
